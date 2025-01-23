using SolanaSpin.Framework.Core.Paging;
using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpotsList;
public record GetJackpotsListRequest(
    PaginationFilter Filter) : IRequest<PagedList<JackpotDto>>;
