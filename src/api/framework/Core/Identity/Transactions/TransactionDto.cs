using SolanaSpin.Framework.Core.Identity.Users.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Transactions;
public enum TransactionDirection
{
    Deposit,
    Withdrawal
}
public enum TransactionStatus
{
    Pending,
    Completed,
    Failed
}
public class TransactionDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public TransactionDirection Direction { get; set; }
    public string WithAddress { get; set; } = string.Empty;
    public TransactionStatus Status { get; set; }
    public UserDto? BelongsTo { get; set; }
}
