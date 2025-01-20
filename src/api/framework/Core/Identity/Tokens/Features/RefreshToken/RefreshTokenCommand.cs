namespace SolanaSpin.Framework.Core.Identity.Tokens.Features.RefreshToken;
public record RefreshTokenCommand(
    string Token,
    string RefreshToken);
