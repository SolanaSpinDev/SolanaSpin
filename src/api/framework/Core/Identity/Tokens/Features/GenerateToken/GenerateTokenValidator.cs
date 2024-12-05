using FluentValidation;

namespace FSH.Framework.Core.Identity.Tokens.Features.GenerateToken;

public class GenerateTokenValidator : AbstractValidator<GenerateTokenCommand>
{
    public GenerateTokenValidator()
    {
        RuleFor(p => p.Email).Cascade(CascadeMode.Stop)
            .NotEmpty()
            .EmailAddress();

        RuleFor(p => p.Password).Cascade(CascadeMode.Stop)
            .NotEmpty();
    }
}
