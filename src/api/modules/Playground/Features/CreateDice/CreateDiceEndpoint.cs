using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.CreateDice;
public static class CreateDiceEndpoint
{
    internal static RouteHandlerBuilder MapCreateDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", async (CreateDiceCommand request, ISender mediator) =>
                {
                    var response = await mediator.Send(request);
                    return Results.CreatedAtRoute(nameof(CreateDiceEndpoint), new { id = response.Id }, response);
                })
                .WithName(nameof(CreateDiceEndpoint))
                .WithSummary("Creates a dice")
                .WithDescription("Creates a dice")
                .Produces<DiceDto>(StatusCodes.Status201Created)
                .RequirePermission("Permissions.Dice.Create")
                .MapToApiVersion(new ApiVersion(1, 0));
    }
}
