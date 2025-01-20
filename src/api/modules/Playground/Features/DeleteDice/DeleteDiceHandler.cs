using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Features.DeleteDice;
public sealed class DeleteDiceHandler(
    ILogger<DeleteDiceHandler> logger,
    [FromKeyedServices("playground:dice")] IRepository<Dice> repository)
    : IRequestHandler<DeleteDiceCommand>
{
    public async Task Handle(DeleteDiceCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await repository.GetByIdAsync(request.Id, cancellationToken);
        _ = item ?? throw new DiceNotFoundException(request.Id);
        await repository.DeleteAsync(item, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("dice {Id} deleted", item.Id);
    }
}
