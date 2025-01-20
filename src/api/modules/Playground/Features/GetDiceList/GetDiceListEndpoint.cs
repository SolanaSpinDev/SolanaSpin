using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetDiceList;
public static class GetDiceListEndpoint
{
    internal static RouteHandlerBuilder MapGetDiceListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/search", async (ISender mediator, [FromBody] PaginationFilter filter) =>
        {
            var response = await mediator.Send(new GetDiceListRequest(filter));
            return Results.Ok(response);
        })
        .WithName(nameof(GetDiceListEndpoint))
        .WithSummary("Gets a list of dice with paging support")
        .WithDescription("Gets a list of dice with paging support")
        .Produces<PagedList<DiceDto>>()
        .RequirePermission("Permissions.Dice.View")
        .MapToApiVersion(1);
    }
}
