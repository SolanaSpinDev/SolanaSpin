using MediatR;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Features.RejectWithdrawal;
public record RejectWithdrawalCommand(
    Guid TransactionId,
    string? Reason) : IRequest<TransactionDto>;
