using SolanaSpin.Framework.Core.Paging;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpotList;
public record GetJackpotListRequest(
    PaginationFilter Filter) : IRequest<PagedList<JackpotDto>>;
