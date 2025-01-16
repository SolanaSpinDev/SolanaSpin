using System.Security.Claims;
using System.Threading;
using FSH.Framework.Core.Exceptions;
using FSH.Framework.Core.Identity.Users.Abstractions;
using FSH.Framework.Core.Identity.Users.Features.UpdateUser;
using FSH.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FSH.Framework.Infrastructure.Identity.Users.Endpoints;
public static class UpdateBalanceEndpoint
{
    internal static RouteHandlerBuilder MapUpdateBalanceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/{id:guid}/balance/{delta:decimal}", (string id, decimal delta, CancellationToken cancellationToken, ISender mediator, ClaimsPrincipal user, IUserService service) =>
        {
            return service.UpdateBalanceAsync(id, delta, cancellationToken);
        })
        .WithName(nameof(UpdateBalanceEndpoint))
        .WithSummary("update user balance with delta")
        .RequirePermission("Permissions.Users.Update")
        .WithDescription("update user balance with delta");
    }
}
