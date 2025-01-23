namespace SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

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
    public string? Reason { get; set; }
    public string? TxHash { get; set; }
    public DateTimeOffset Created { get; set; }
    public DateTimeOffset LastModified { get; set; }
}
