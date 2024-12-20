﻿using FluentValidation;

namespace FSH.Framework.Core.Identity.Tokens.Features.RefreshToken;

public class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokenValidator()
    {
        RuleFor(p => p.Token).Cascade(CascadeMode.Stop)
            .NotEmpty();

        RuleFor(p => p.RefreshToken).Cascade(CascadeMode.Stop)
            .NotEmpty();
    }
}
