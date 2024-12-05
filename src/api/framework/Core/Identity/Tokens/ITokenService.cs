using FSH.Framework.Core.Identity.Tokens.Features.GenerateToken;
using FSH.Framework.Core.Identity.Tokens.Features.RefreshToken;

namespace FSH.Framework.Core.Identity.Tokens;
public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(GenerateTokenCommand request, string ipAddress, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenCommand request, string ipAddress, CancellationToken cancellationToken);
}
