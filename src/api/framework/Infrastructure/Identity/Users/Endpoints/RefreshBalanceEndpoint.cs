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
public static class RefreshBalanceEndpoint
{
    internal static RouteHandlerBuilder MapRefreshBalanceEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/{id:guid}/balance/refresh", (string id, CancellationToken cancellationToken, ISender mediator, ClaimsPrincipal user, IUserService service) =>
        {
            return service.RefreshBalanceAsync(id, cancellationToken);
        })
        .WithName(nameof(RefreshBalanceEndpoint))
        .WithSummary("refresh user balance")
        .RequirePermission("Permissions.Users.Update")
        .WithDescription("refresh user balance");
    }
}
