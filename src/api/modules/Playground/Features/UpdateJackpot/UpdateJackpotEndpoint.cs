using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.UpdateJackpot;
public static class UpdateJackpotEndpoint
{
    internal static RouteHandlerBuilder MapUpdateJackpotEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.
            MapPut("/{id:guid}", async (Guid id, UpdateJackpotCommand request, ISender mediator) =>
            {
                if (id != request.Id) return Results.BadRequest();
                var response = await mediator.Send(request);
                return Results.Ok(response);
            })
            .WithName(nameof(UpdateJackpotEndpoint))
            .WithSummary("Updates a jackpot")
            .WithDescription("Updates a jackpot")
            .Produces<JackpotDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequirePermission("Permissions.Jackpots.Update")
            .MapToApiVersion(new ApiVersion(1, 0));
    }
}
