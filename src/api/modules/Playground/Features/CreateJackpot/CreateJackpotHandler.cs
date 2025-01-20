using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.CreateJackpot;
public sealed class CreateJackpotHandler(
    ILogger<CreateJackpotHandler> logger,
    [FromKeyedServices("playground:jackpot")] IRepository<Jackpot> repository)
    : IRequestHandler<CreateJackpotCommand, JackpotDto>
{
    public async Task<JackpotDto> Handle(CreateJackpotCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = Jackpot.Create(request);
        await repository.AddAsync(item, cancellationToken).ConfigureAwait(false);
        await repository.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        logger.LogInformation("jackpot {Id} created", item.Id);
        return item.Adapt<JackpotDto>();
    }
}
