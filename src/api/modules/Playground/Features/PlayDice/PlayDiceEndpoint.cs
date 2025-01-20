using Asp.Versioning;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public static class PlayDiceEndpoint
{
    internal static RouteHandlerBuilder MapPlayDiceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", (PlayDiceRequest request, ISender mediator) => mediator.Send(request))
                        .WithName(nameof(PlayDiceEndpoint))
                        .WithSummary("Plays a dice")
                        .WithDescription("Plays a dice")
                        .Produces<PlayDiceResponse>()
                        .RequirePermission("Permissions.Dice.Play")
                        .MapToApiVersion(new ApiVersion(1, 0));
    }
}
