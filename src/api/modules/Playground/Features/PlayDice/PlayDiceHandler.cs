using System.Security.Claims;
using System.Security.Cryptography;
using FSH.Framework.Core.Exceptions;
using FSH.Framework.Core.Identity.Users.Abstractions;
using FSH.Framework.Core.Persistence;
using FSH.Framework.Infrastructure.Identity.Users;
using Mapster;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Domain.Specifications;
using SolanaSpin.WebApi.Playground.Exceptions;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public sealed class PlayDiceHandler(
    ILogger<PlayDiceHandler> logger,
    [FromKeyedServices("playground:dice")] IRepository<Dice> repository,
    ICurrentUser currentUser,
    IUserService userService)
    : IRequestHandler<PlayDiceRequest, PlayDiceResponse>
{
    private static decimal GetRandomDecimal()
    {
        using var rng = RandomNumberGenerator.Create();
        var randomValue = new byte[8];
        rng.GetBytes(randomValue);
        return BitConverter.ToUInt64(randomValue, 0) / (1.0m + ulong.MaxValue);
    }

    private static int GetRandomIndex(decimal[] weights)
    {
        var randomNumber = GetRandomDecimal();
        var totalWeight = weights.Sum();
        var cumulativeWeight = 0m;
        for (var i = 0; i < weights.Length; i++)
        {
            cumulativeWeight += weights[i];
            if (randomNumber < cumulativeWeight / totalWeight)
            {
                return i;
            }
        }
        return -1;
    }

    private async Task<PlayDiceResult> PlayDiceAsync(DiceDto dice, decimal playAmount, CancellationToken cancellationToken)
    {
        var faceIndex = GetRandomIndex(dice.Faces.Select(x => x.Weight).ToArray());
        var face = dice.Faces.ElementAt(faceIndex);
        logger.LogInformation("dice {Id} played", dice.Id);
        switch (face.ResultType)
        {
            case FaceResultType.Multiplier:
                var multiplier = Convert.ToDecimal(face.ResultValue);
                return new PlayDiceResult(dice, faceIndex, playAmount * multiplier);
            case FaceResultType.FixedAmount:
                var fixedAmount = Convert.ToDecimal(face.ResultValue);
                return new PlayDiceResult(dice, faceIndex, fixedAmount);
            case FaceResultType.NewDicePlay:
                var newDiceSlug = face.ResultValue!;
                var newDice = await GetDiceAsync(newDiceSlug, false, cancellationToken);
                var innerResult = await PlayDiceAsync(newDice, playAmount, cancellationToken);
                return new PlayDiceResult(dice, faceIndex, innerResult.ReturnAmount, innerResult);
            case FaceResultType.RaffleTicket:
                return new PlayDiceResult(dice, faceIndex, playAmount);
            default:
                return new PlayDiceResult(dice, faceIndex, 0m);
        }
    }

    private async Task<DiceDto> GetDiceAsync(string slug, bool onlyPublic, CancellationToken cancellationToken)
    {
        var dice = await repository.FirstOrDefaultAsync(new DiceBySlugFilterSpec(slug), cancellationToken)
            ?? throw new DiceSlugNotFoundException(slug);
        return onlyPublic && !dice.IsPubliclyPlayable
            ? throw new DiceNotPlayableException(dice.Id)
            : !dice.Faces.Any() ? throw new PlayDiceWithNoFacesException(dice.Id) : dice.Adapt<DiceDto>();
    }

    public async Task<PlayDiceResponse> Handle(PlayDiceRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        if (!currentUser.IsAuthenticated())
        {
            throw new UnauthorizedException();
        }

        var userId = currentUser.GetUserId().ToString();
        var user = await userService.GetAsync(userId, cancellationToken);
        if (user.Balance < request.PlayAmount)
        {
            throw new InsufficientBalanceException(user.Balance, request.PlayAmount);
        }

        var dice = await GetDiceAsync(request.DiceSlug, true, cancellationToken);
        var result = await PlayDiceAsync(dice, request.PlayAmount, cancellationToken);
        var response = new PlayDiceResponse(user.Balance, request, result);
        _ = await userService.UpdateBalanceAsync(userId, response.NetAmount, cancellationToken);

        return response;
    }
}
