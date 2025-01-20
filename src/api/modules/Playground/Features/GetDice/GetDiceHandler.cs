using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.GetDice;
public sealed class GetDiceHandler(
    [FromKeyedServices("playground:dice")] IReadRepository<Dice> repository,
    ICacheService cache)
    : IRequestHandler<GetDiceRequest, DiceDto>
{
    public async Task<DiceDto> Handle(GetDiceRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await cache.GetOrSetAsync(
            $"dice:{request.Id}",
            async () =>
            {
                var item = await repository.GetByIdAsync(request.Id, cancellationToken);
                return item is not null
                    ? item.Adapt<DiceDto>()
                    : throw new DiceNotFoundException(request.Id);
            },
            cancellationToken: cancellationToken);
        return item!;
    }
}
