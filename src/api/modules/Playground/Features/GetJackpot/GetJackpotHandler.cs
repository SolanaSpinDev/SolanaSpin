using SolanaSpin.Framework.Core.Caching;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Mapster;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpot;
public sealed class GetJackpotHandler(
    [FromKeyedServices("playground:jackpot")] IReadRepository<Jackpot> repository,
    ICacheService cache)
    : IRequestHandler<GetJackpotRequest, JackpotDto>
{
    public async Task<JackpotDto> Handle(GetJackpotRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var item = await cache.GetOrSetAsync(
            $"jackpot:{request.Id}",
            async () =>
            {
                var item = await repository.GetByIdAsync(request.Id, cancellationToken);
                return item is not null
                    ? item.Adapt<JackpotDto>()
                    : throw new JackpotNotFoundException(request.Id);
            },
            cancellationToken: cancellationToken);
        return item!;
    }
}
