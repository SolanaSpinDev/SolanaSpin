using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetDice;
public static class GetDiceEndpoint
{
    internal static RouteHandlerBuilder MapGetDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/{id:guid}", async (Guid id, ISender mediator) =>
                        {
                            var response = await mediator.Send(new GetDiceRequest(id));
                            return Results.Ok(response);
                        })
                        .WithName(nameof(GetDiceEndpoint))
                        .WithSummary("Gets dice by id")
                        .WithDescription("Gets dice by id")
                        .Produces<DiceDto>()
                        .RequirePermission("Permissions.Dice.View")
                        .MapToApiVersion(1);
    }
}
