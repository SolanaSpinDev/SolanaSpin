using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.UpdateJackpot;
public sealed class UpdateJackpotHandler(
    ILogger<UpdateJackpotHandler> logger,
    [FromKeyedServices("playground:jackpot")] IRepository<Jackpot> repository)
    : IRequestHandler<UpdateJackpotCommand, JackpotDto>
{
    public async Task<JackpotDto> Handle(UpdateJackpotCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await repository.GetByIdAsync(request.Id, cancellationToken);
        _ = item ?? throw new JackpotNotFoundException(request.Id);
        item = item.Update(request);
        await repository.UpdateAsync(item, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("jackpot {Id} updated", item.Id);
        return item.Adapt<JackpotDto>();
    }
}
