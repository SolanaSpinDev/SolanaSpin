using SolanaSpin.Blazor.Infrastructure.Api;

namespace SolanaSpin.Blazor.Infrastructure.Auth;

public interface IAuthenticationService
{

    void NavigateToExternalLogin(string tenantId, string provider);

    Task<bool> LoginAsync(string tenantId, GenerateTokenCommand request);

    Task LogoutAsync();

    Task ReLoginAsync(string returnUrl);
}
