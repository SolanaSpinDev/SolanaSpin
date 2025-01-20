using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Domain.Events;
using Mapster;
using MediatR;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Domain.Events;
public record DiceUpdated(Dice Dice) : DomainEvent;

public class DiceUpdatedEventHandler(
    ILogger<DiceUpdatedEventHandler> logger,
    ICacheService cache)
    : INotificationHandler<DiceUpdated>
{
    public async Task Handle(DiceUpdated notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("handling dice updated domain event..");
        var cacheResponse = notification.Dice.Adapt<DiceDto>();
        await cache.SetAsync($"dice:{notification.Dice.Id}", cacheResponse, cancellationToken: cancellationToken);
        logger.LogInformation("finished handling dice updated domain event..");
    }
}
