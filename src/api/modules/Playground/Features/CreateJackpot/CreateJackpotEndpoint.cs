using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.CreateJackpot;
public static class CreateJackpotEndpoint
{
    internal static RouteHandlerBuilder MapCreateJackpotEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", async (CreateJackpotCommand request, ISender mediator) =>
                {
                    var response = await mediator.Send(request);
                    return Results.CreatedAtRoute(nameof(CreateJackpotEndpoint), new { id = response.Id }, response);
                })
                .WithName(nameof(CreateJackpotEndpoint))
                .WithSummary("Creates a jackpot")
                .WithDescription("Creates a jackpot")
                .Produces<JackpotDto>(StatusCodes.Status201Created)
                .RequirePermission("Permissions.Jackpots.Create")
                .MapToApiVersion(new ApiVersion(1, 0));
    }
}
