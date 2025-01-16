using Microsoft.AspNetCore.Identity;

namespace FSH.Framework.Infrastructure.Identity.Users;
public class FshUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Uri? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public decimal Balance { get; set; }
    public string? DepositAddress { get; set; }
    public string? DepositAddressPrivateKey { get; set; }

    public string? ObjectId { get; set; }
}
