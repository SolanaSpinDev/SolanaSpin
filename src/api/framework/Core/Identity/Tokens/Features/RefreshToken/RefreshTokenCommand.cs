namespace FSH.Framework.Core.Identity.Tokens.Features.RefreshToken;
public record RefreshTokenCommand(
    string Token,
    string RefreshToken);
