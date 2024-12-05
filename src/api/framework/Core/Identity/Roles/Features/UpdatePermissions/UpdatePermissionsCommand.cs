namespace FSH.Framework.Core.Identity.Roles.Features.UpdatePermissions;
public record UpdatePermissionsCommand(string RoleId,
    List<string> Permissions);
