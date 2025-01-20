using SolanaSpin.Framework.Core.Identity.Tokens.Features.GenerateToken;
using SolanaSpin.Framework.Core.Identity.Tokens.Features.RefreshToken;

namespace SolanaSpin.Framework.Core.Identity.Tokens;
public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(GenerateTokenCommand request, string ipAddress, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, string ipAddress, CancellationToken cancellationToken);
}
