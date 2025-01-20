using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Domain.Events;
using Mapster;
using MediatR;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Domain.Events;
public record JackpotCreated(Jackpot Jackpot) : DomainEvent;

public class JackpotCreatedEventHandler(
    ILogger<JackpotCreatedEventHandler> logger,
    ICacheService cache)
    : INotificationHandler<JackpotCreated>
{
    public async Task Handle(JackpotCreated notification, CancellationToken cancellationToken)
    {
        logger.LogInformation("handling jackpot created domain event..");
        var cacheResponse = notification.Jackpot.Adapt<JackpotDto>();
        await cache.SetAsync($"jackpot:{notification.Jackpot.Id}", cacheResponse, cancellationToken: cancellationToken);
        logger.LogInformation("finished handling jackpot created domain event..");
    }
}
