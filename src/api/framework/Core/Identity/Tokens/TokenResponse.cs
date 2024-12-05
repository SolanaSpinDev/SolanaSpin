namespace FSH.Framework.Core.Identity.Tokens;
public record TokenResponse(
    string Token,
    string RefreshToken,
    DateTime RefreshTokenExpiryTime);
