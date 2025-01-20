using SolanaSpin.Framework.Core.Identity.Users.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Users.Features.AssignUserRole;
public class AssignUserRoleCommand
{
    public List<UserRoleDto> UserRoles { get; set; } = new();
}
