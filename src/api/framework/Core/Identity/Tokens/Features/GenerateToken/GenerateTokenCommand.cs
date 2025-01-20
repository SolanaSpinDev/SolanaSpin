using System.ComponentModel;
using SolanaSpin.Framework.Core.Tenant;

namespace SolanaSpin.Framework.Core.Identity.Tokens.Features.GenerateToken;
public record GenerateTokenCommand(
    [property: DefaultValue(TenantConstants.Root.EmailAddress)] string Email,
    [property: DefaultValue(TenantConstants.DefaultPassword)] string Password);
