using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.UpdateDice;
public sealed class UpdateDiceHandler(
    ILogger<UpdateDiceHandler> logger,
    [FromKeyedServices("playground:dice")] IRepository<Dice> repository)
    : IRequestHandler<UpdateDiceCommand, DiceDto>
{
    public async Task<DiceDto> Handle(UpdateDiceCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await repository.GetByIdAsync(request.Id, cancellationToken);
        _ = item ?? throw new DiceNotFoundException(request.Id);
        item = item.Update(request);
        await repository.UpdateAsync(item, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("dice {Id} updated", item.Id);
        return item.Adapt<DiceDto>();
    }
}
