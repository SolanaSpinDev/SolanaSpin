using Microsoft.AspNetCore.Identity;

namespace SolanaSpin.Framework.Infrastructure.Identity.RoleClaims;
public class AppRoleClaim : IdentityRoleClaim<string>
{
    public string? CreatedBy { get; init; }
    public DateTimeOffset CreatedOn { get; init; }
}
