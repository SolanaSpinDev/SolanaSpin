using SolanaSpin.Framework.Core.Identity.Roles;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.Framework.Infrastructure.Identity.Roles.Endpoints;

public static class DeleteRoleEndpoint
{
    public static RouteHandlerBuilder MapDeleteRoleEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapDelete("/{id:guid}", async (string id, IRoleService roleService) =>
        {
            await roleService.DeleteRoleAsync(id);
        })
        .WithName(nameof(DeleteRoleEndpoint))
        .WithSummary("Delete a transaction by ID")
        .RequirePermission("Permissions.Transactions.Delete")
        .WithDescription("Remove a transaction by its ID.");
    }
}

