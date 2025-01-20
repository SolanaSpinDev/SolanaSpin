using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.WebApi.Playground.Features.DeleteJackpot;
public static class DeleteJackpotEndpoint
{
    internal static RouteHandlerBuilder MapDeleteJackpotEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints
            .MapDelete("/{id:guid}", async (Guid id, ISender mediator) =>
            {
                await mediator.Send(new DeleteJackpotCommand(id));
                return Results.NoContent();
            })
            .WithName(nameof(DeleteJackpotEndpoint))
            .WithSummary("Deletes a jackpot")
            .WithDescription("Deletes a jackpot")
            .Produces(StatusCodes.Status204NoContent)
            .RequirePermission("Permissions.Jackpots.Delete")
            .MapToApiVersion(new ApiVersion(1, 0));
    }
}
