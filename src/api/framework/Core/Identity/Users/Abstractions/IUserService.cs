using System.Security.Claims;
using SolanaSpin.Framework.Core.Identity.Users.Dtos;
using SolanaSpin.Framework.Core.Identity.Users.Features.AssignUserRole;
using SolanaSpin.Framework.Core.Identity.Users.Features.ChangePassword;
using SolanaSpin.Framework.Core.Identity.Users.Features.ForgotPassword;
using SolanaSpin.Framework.Core.Identity.Users.Features.RegisterUser;
using SolanaSpin.Framework.Core.Identity.Users.Features.ResetPassword;
using SolanaSpin.Framework.Core.Identity.Users.Features.ToggleUserStatus;
using SolanaSpin.Framework.Core.Identity.Users.Features.UpdateUser;

namespace SolanaSpin.Framework.Core.Identity.Users.Abstractions;
public interface IUserService
{
    Task<bool> ExistsWithNameAsync(string name);
    Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null);
    Task<bool> ExistsWithPhoneNumberAsync(string phoneNumber, string? exceptId = null);
    Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken);
    Task<int> GetCountAsync(CancellationToken cancellationToken);
    Task<UserDto> GetAsync(string userId, CancellationToken cancellationToken);
    Task ToggleStatusAsync(ToggleUserStatusCommand request, CancellationToken cancellationToken);
    Task<string> GetOrCreateFromPrincipalAsync(ClaimsPrincipal principal);
    Task<RegisterUserResponse> RegisterAsync(RegisterUserCommand request, string origin, CancellationToken cancellationToken);
    Task UpdateAsync(UpdateUserCommand request, string userId);
    Task DeleteAsync(string userId);
    Task<string> ConfirmEmailAsync(string userId, string code, string tenant, CancellationToken cancellationToken);
    Task<string> ConfirmPhoneNumberAsync(string userId, string code);

    // permisions
    Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken = default);
    Task<List<string>?> GetPermissionsAsync(string userId, CancellationToken cancellationToken);

    // passwords
    Task ForgotPasswordAsync(ForgotPasswordCommand request, string origin, CancellationToken cancellationToken);
    Task ResetPasswordAsync(ResetPasswordCommand request, CancellationToken cancellationToken);
    Task ChangePasswordAsync(ChangePasswordCommand request, string userId);

    // roles
    Task<string> AssignRolesAsync(string userId, AssignUserRoleCommand request, CancellationToken cancellationToken);
    Task<List<UserRoleDto>> GetUserRolesAsync(string userId, CancellationToken cancellationToken);

    // balance
    Task<decimal> UpdateBalanceAsync(string userId, decimal delta, CancellationToken cancellationToken);
    Task<decimal> RefreshBalanceAsync(string userId, CancellationToken cancellationToken);
}
