using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Domain.Events;
using Mapster;
using MediatR;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Domain.Events;
public record JackpotUpdated(Jackpot Jackpot) : DomainEvent;

public class JackpotUpdatedEventHandler(
    ILogger<JackpotUpdatedEventHandler> logger,
    ICacheService cache)
    : INotificationHandler<JackpotUpdated>
{
    public async Task Handle(JackpotUpdated notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("handling jackpot updated domain event..");
        var cacheResponse = notification.Jackpot.Adapt<JackpotDto>();
        await cache.SetAsync($"jackpot:{notification.Jackpot.Id}", cacheResponse, cancellationToken: cancellationToken);
        logger.LogInformation("finished handling jackpot updated domain event..");
    }
}
