using SolanaSpin.Framework.Core.Identity.Users.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

public class UserTransactionDto : TransactionDto
{
    public UserDto User { get; set; } = null!;
}
