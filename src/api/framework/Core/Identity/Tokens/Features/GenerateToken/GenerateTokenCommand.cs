using System.ComponentModel;
using FSH.Framework.Core.Tenant;

namespace FSH.Framework.Core.Identity.Tokens.Features.GenerateToken;
public record GenerateTokenCommand(
    [property: DefaultValue(TenantConstants.Root.EmailAddress)] string Email,
    [property: DefaultValue(TenantConstants.DefaultPassword)] string Password);
