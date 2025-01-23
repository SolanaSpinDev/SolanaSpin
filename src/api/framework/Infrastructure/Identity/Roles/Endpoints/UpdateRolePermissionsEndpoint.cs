using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SolanaSpin.Framework.Core.Identity.Roles;
using SolanaSpin.Framework.Core.Identity.Roles.Features.UpdatePermissions;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Roles.Endpoints;
public static class UpdateRolePermissionsEndpoint
{
    public static RouteHandlerBuilder MapUpdateRolePermissionsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPut("/{id}/permissions", async (
            string id,
            [FromBody] UpdatePermissionsCommand request,
            [FromServices] IRoleService roleService,
            [FromServices] IValidator<UpdatePermissionsCommand> validator,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
            if (id != request.RoleId)
            {
                return Results.BadRequest();
            }

            var response = await roleService.UpdatePermissionsAsync(request);
            return Results.Ok(response);
        })
        .WithName(nameof(UpdateRolePermissionsEndpoint))
        .WithSummary("update role permissions")
        .RequirePermission("Permissions.Roles.Create")
        .WithDescription("update role permissions");
    }
}
