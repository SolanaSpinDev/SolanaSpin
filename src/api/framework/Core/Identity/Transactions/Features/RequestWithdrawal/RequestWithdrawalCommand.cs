using System.ComponentModel;
using MediatR;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Features.RequestWithdrawal;
public record RequestWithdrawalCommand(
    [property: DefaultValue(0)] decimal Amount,
    [property: DefaultValue("0x0000000000000000000000000000000000000000")] string ToAddress
    ) : IRequest<TransactionDto>;
