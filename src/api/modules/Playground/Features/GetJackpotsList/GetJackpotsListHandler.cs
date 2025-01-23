using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpotsList;
public sealed class GetJackpotsListHandler(
    [FromKeyedServices("playground:jackpot")] IReadRepository<Jackpot> repository)
    : IRequestHandler<GetJackpotsListRequest, PagedList<JackpotDto>>
{
    public async Task<PagedList<JackpotDto>> Handle(GetJackpotsListRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var spec = new EntitiesByPaginationFilterSpec<Jackpot, JackpotDto>(request.Filter);
        return await repository.PaginatedListAsync(spec, request.Filter, cancellationToken).ConfigureAwait(false);
    }
}
