using MediatR;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Features.ApproveWithdrawal;
public record ApproveWithdrawalCommand(
    Guid TransactionId,
    string? Reason) : IRequest<TransactionDto>;
