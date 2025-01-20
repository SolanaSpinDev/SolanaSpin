using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace SolanaSpin.WebApi.Playground.Features.GetDiceList;
public sealed class GetDiceListHandler(
    [FromKeyedServices("playground:dice")] IReadRepository<Dice> repository)
    : IRequestHandler<GetDiceListRequest, PagedList<DiceDto>>
{
    public async Task<PagedList<DiceDto>> Handle(GetDiceListRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);

        var spec = new EntitiesByPaginationFilterSpec<Dice, DiceDto>(request.Filter);

        var items = await repository.ListAsync(spec, cancellationToken).ConfigureAwait(false);
        var totalCount = await repository.CountAsync(spec, cancellationToken).ConfigureAwait(false);

        return new PagedList<DiceDto>(items, request.Filter.PageNumber, request.Filter.PageSize, totalCount);
    }
}
