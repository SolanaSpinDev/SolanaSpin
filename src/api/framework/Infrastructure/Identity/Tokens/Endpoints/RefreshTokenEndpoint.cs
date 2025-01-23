using SolanaSpin.Framework.Core.Identity.Tokens;
using SolanaSpin.Framework.Core.Identity.Tokens.Features.RefreshToken;
using SolanaSpin.Framework.Core.Tenant;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace SolanaSpin.Framework.Infrastructure.Identity.Tokens.Endpoints;
public static class RefreshTokenEndpoint
{
    internal static RouteHandlerBuilder MapRefreshTokenEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/refresh", async (RefreshTokenCommand request,
            [FromHeader(Name = TenantConstants.Identifier)] string tenant,
            ITokenService service,
            HttpContext context,
            [FromServices] IValidator<RefreshTokenCommand> validator,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
            string ip = context.GetIpAddress();
            return await service.RefreshTokenAsync(request, ip!, cancellationToken);
        })
        .WithName(nameof(RefreshTokenEndpoint))
        .WithSummary("refresh JWTs")
        .WithDescription("refresh JWTs")
        .AllowAnonymous();
    }
}

