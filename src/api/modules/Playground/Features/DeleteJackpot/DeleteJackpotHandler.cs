using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Features.DeleteJackpot;
public sealed class DeleteJackpotHandler(
    ILogger<DeleteJackpotHandler> logger,
    [FromKeyedServices("playground:jackpot")] IRepository<Jackpot> repository)
    : IRequestHandler<DeleteJackpotCommand>
{
    public async Task Handle(DeleteJackpotCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await repository.GetByIdAsync(request.Id, cancellationToken);
        _ = item ?? throw new JackpotNotFoundException(request.Id);
        await repository.DeleteAsync(item, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("jackpot {Id} deleted", item.Id);
    }
}
