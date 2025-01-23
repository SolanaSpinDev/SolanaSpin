using SolanaSpin.Framework.Core.Identity.Tokens;
using SolanaSpin.Framework.Core.Identity.Tokens.Features.GenerateToken;
using SolanaSpin.Framework.Core.Tenant;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using FluentValidation;

namespace SolanaSpin.Framework.Infrastructure.Identity.Tokens.Endpoints;
public static class GenerateTokenEndpoint
{
    internal static RouteHandlerBuilder MapTokenGenerationEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/", async (GenerateTokenCommand request,
            [FromHeader(Name = TenantConstants.Identifier)] string tenant,
            ITokenService service,
            HttpContext context,
            [FromServices] IValidator<GenerateTokenCommand> validator,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
            string ip = context.GetIpAddress();
            return await service.GenerateTokenAsync(request, ip!, cancellationToken);
        })
        .WithName(nameof(GenerateTokenEndpoint))
        .WithSummary("generate JWTs")
        .WithDescription("generate JWTs")
        .AllowAnonymous();
    }
}
