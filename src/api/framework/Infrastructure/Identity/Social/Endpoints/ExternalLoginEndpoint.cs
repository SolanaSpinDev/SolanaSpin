using SolanaSpin.Framework.Core.Tenant;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.Framework.Infrastructure.Identity.Social.Endpoints;
public static class ExternalLoginEndpoint
{
    internal static RouteHandlerBuilder MapExternalLoginEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/external-login/{provider}", (string provider,
            [FromQuery(Name = TenantConstants.Identifier)] string tenant,
            IAuthenticationService service,
            HttpContext context,
            CancellationToken cancellationToken) =>
        {
            var redirectUrl = "https://game.solanaspin.io/";
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Results.Challenge(properties, [provider]);
        })
        .WithName(nameof(ExternalLoginEndpoint))
        .WithSummary("redirect to external login")
        .WithDescription("redirect to external login")
        .AllowAnonymous();
    }
}
