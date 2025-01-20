using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpotList;
public static class GetJackpotListEndpoint
{
    internal static RouteHandlerBuilder MapGetJackpotListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/search", async (ISender mediator, [FromBody] PaginationFilter filter) =>
        {
            var response = await mediator.Send(new GetJackpotListRequest(filter));
            return Results.Ok(response);
        })
        .WithName(nameof(GetJackpotListEndpoint))
        .WithSummary("Gets a list of jackpots with paging support")
        .WithDescription("Gets a list of jackpots with paging support")
        .Produces<PagedList<JackpotDto>>()
        .RequirePermission("Permissions.Jackpots.View")
        .MapToApiVersion(1);
    }
}
