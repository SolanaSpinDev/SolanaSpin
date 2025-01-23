using FluentValidation;

namespace SolanaSpin.Framework.Core.Identity.Transactions.Features.RequestWithdrawal;
public class RequestWithdrawalValidator : AbstractValidator<RequestWithdrawalCommand>
{
    public RequestWithdrawalValidator()
    {
        _ = RuleFor(p => p.Amount).GreaterThan(0);
    }
}
