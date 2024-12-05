namespace FSH.Framework.Core.Identity.Roles.Features.CreateOrUpdateRole;
public record CreateOrUpdateRoleCommand(string Id,
    string Name,
    string? Description);
