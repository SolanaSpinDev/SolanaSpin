﻿using FSH.Framework.Core.Identity.Tokens;
using FSH.Framework.Core.Identity.Tokens.Features.GenerateToken;
using FSH.Framework.Core.Tenant;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace FSH.Framework.Infrastructure.Identity.Tokens.Endpoints;
public static class GenerateTokenEndpoint
{
    internal static RouteHandlerBuilder MapTokenGenerationEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", (GenerateTokenCommand request,
            [FromHeader(Name = TenantConstants.Identifier)] string tenant,
            ITokenService service,
            HttpContext context,
            CancellationToken cancellationToken) =>
        {
            string ip = context.GetIpAddress();
            return service.GenerateTokenAsync(request, ip!, cancellationToken);
        })
        .WithName(nameof(GenerateTokenEndpoint))
        .WithSummary("generate JWTs")
        .WithDescription("generate JWTs")
        .AllowAnonymous();
    }
}
