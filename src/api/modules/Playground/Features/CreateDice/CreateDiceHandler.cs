using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.CreateDice;
public sealed class CreateDiceHandler(
    ILogger<CreateDiceHandler> logger,
    [FromKeyedServices("playground:dice")] IRepository<Dice> repository)
    : IRequestHandler<CreateDiceCommand, DiceDto>
{
    public async Task<DiceDto> Handle(CreateDiceCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = Dice.Create(request);
        await repository.AddAsync(item, cancellationToken).ConfigureAwait(false);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("dice {Id} created", item.Id);
        return item.Adapt<DiceDto>();
    }
}
