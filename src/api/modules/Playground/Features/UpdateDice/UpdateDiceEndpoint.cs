using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.UpdateDice;
public static class UpdateDiceEndpoint
{
    internal static RouteHandlerBuilder MapUpdateDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.
            MapPut("/{id:guid}", async (Guid id, UpdateDiceCommand request, ISender mediator) =>
            {
                if (id != request.Id) return Results.BadRequest();
                var response = await mediator.Send(request);
                return Results.Ok(response);
            })
            .WithName(nameof(UpdateDiceEndpoint))
            .WithSummary("Updates a dice")
            .WithDescription("Updates a dice")
            .Produces<DiceDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequirePermission("Permissions.Dice.Update")
            .MapToApiVersion(new ApiVersion(1, 0));
    }
}
