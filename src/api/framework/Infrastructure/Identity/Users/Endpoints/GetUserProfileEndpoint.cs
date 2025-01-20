using SolanaSpin.Framework.Core.Exceptions;
using System.Security.Claims;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.Framework.Infrastructure.Identity.Users.Endpoints;
public static class GetUserProfileEndpoint
{
    internal static RouteHandlerBuilder MapGetMeEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/profile", async (ClaimsPrincipal user, IUserService service, CancellationToken cancellationToken) =>
        {
            if (user.GetUserId() is not { } userId || string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException();
            }

            var profile =  await service.GetAsync(userId, cancellationToken);
            profile.Balance = await service.RefreshBalanceAsync(userId, cancellationToken);
            return profile;
        })
        .WithName("GetMeEndpoint")
        .WithSummary("Get current user information based on token")
        .WithDescription("Get current user information based on token");
    }
}
