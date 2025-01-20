using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetJackpot;
public static class GetJackpotEndpoint
{
    internal static RouteHandlerBuilder MapGetJackpotEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/{id:guid}", async (Guid id, ISender mediator) =>
                        {
                            var response = await mediator.Send(new GetJackpotRequest(id));
                            return Results.Ok(response);
                        })
                        .WithName(nameof(GetJackpotEndpoint))
                        .WithSummary("Gets jackpot by id")
                        .WithDescription("Gets jackpot by id")
                        .Produces<JackpotDto>()
                        .RequirePermission("Permissions.Jackpots.View")
                        .MapToApiVersion(1);
    }
}
