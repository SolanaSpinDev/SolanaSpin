using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpotList;
public sealed class GetJackpotListHandler(
    [FromKeyedServices("playground:jackpot")] IReadRepository<Jackpot> repository)
    : IRequestHandler<GetJackpotListRequest, PagedList<JackpotDto>>
{
    public async Task<PagedList<JackpotDto>> Handle(GetJackpotListRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);

        var spec = new EntitiesByPaginationFilterSpec<Jackpot, JackpotDto>(request.Filter);

        var items = await repository.ListAsync(spec, cancellationToken).ConfigureAwait(false);
        var totalCount = await repository.CountAsync(spec, cancellationToken).ConfigureAwait(false);

        return new PagedList<JackpotDto>(items, request.Filter.PageNumber, request.Filter.PageSize, totalCount);
    }
}
