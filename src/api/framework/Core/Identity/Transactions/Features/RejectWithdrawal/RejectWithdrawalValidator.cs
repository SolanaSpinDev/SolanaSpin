using FluentValidation;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Features.RejectWithdrawal;
public class RejectWithdrawalValidator : AbstractValidator<RejectWithdrawalCommand>
{
    public RejectWithdrawalValidator()
    {
    }
}
