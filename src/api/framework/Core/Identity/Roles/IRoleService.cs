using SolanaSpin.Framework.Core.Identity.Roles.Features.CreateOrUpdateRole;
using SolanaSpin.Framework.Core.Identity.Roles.Features.UpdatePermissions;

namespace SolanaSpin.Framework.Core.Identity.Roles;

public interface IRoleService
{
    Task<IEnumerable<RoleDto>> GetRolesAsync();
    Task<RoleDto?> GetRoleAsync(string id);
    Task<RoleDto> CreateOrUpdateRoleAsync(CreateOrUpdateRoleCommand command);
    Task DeleteRoleAsync(string id);
    Task<RoleDto> GetWithPermissionsAsync(string id, CancellationToken cancellationToken);

    Task<string> UpdatePermissionsAsync(UpdatePermissionsCommand request);
}

