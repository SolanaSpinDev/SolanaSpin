namespace SolanaSpin.Framework.Core.Identity.Users.Dtos;
public class UserDto
{
    public Guid Id { get; set; }

    public string? UserName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public bool IsActive { get; set; } = true;

    public bool EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; }

    public Uri? ImageUrl { get; set; }

    public decimal Balance { get; set; }

    public string? DepositAddress { get; set; }

    //public decimal PendingBalance { get; set; }
}
