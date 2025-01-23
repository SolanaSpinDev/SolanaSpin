using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetDiceList;
public sealed class GetDiceListHandler(
    [FromKeyedServices("playground:dice")] IReadRepository<Dice> repository)
    : IRequestHandler<GetDiceListRequest, PagedList<DiceDto>>
{
    public async Task<PagedList<DiceDto>> Handle(GetDiceListRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var spec = new EntitiesByPaginationFilterSpec<Dice, DiceDto>(request.Filter);
        return await repository.PaginatedListAsync(spec, request.Filter, cancellationToken).ConfigureAwait(false);
    }
}
