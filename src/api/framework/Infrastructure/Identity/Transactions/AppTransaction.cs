using SolanaSpin.Framework.Core.Domain;
using SolanaSpin.Framework.Core.Domain.Contracts;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Infrastructure.Identity.Users;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions;
public class AppTransaction : AuditableEntity, IAggregateRoot
{
    public string UserId { get; set; } = string.Empty;
    public AppUser User { get; set; } = null!;
    public decimal Amount { get; set; }
    public TransactionDirection Direction { get; set; }
    public string WithAddress { get; set; } = string.Empty;
    public TransactionStatus Status { get; set; }
    public string? Reason { get; set; }
    public string? TxHash { get; set; }
}
