using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Domain.Events;
using Mapster;
using MediatR;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Domain.Events;
public record DiceCreated(Dice Dice) : DomainEvent;

public class DiceCreatedEventHandler(
    ILogger<DiceCreatedEventHandler> logger,
    ICacheService cache)
    : INotificationHandler<DiceCreated>
{
    public async Task Handle(DiceCreated notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("handling dice created domain event..");
        var cacheResponse = notification.Dice.Adapt<DiceDto>();
        await cache.SetAsync($"dice:{notification.Dice.Id}", cacheResponse, cancellationToken: cancellationToken);
        logger.LogInformation("finished handling dice created domain event..");
    }
}
