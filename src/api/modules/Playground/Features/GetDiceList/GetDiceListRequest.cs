using SolanaSpin.Framework.Core.Paging;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetDiceList;
public record GetDiceListRequest(
    PaginationFilter Filter) : IRequest<PagedList<DiceDto>>;
