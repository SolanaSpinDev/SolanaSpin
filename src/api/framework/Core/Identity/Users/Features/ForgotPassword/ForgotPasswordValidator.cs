﻿using FluentValidation;

namespace SolanaSpin.Framework.Core.Identity.Users.Features.ForgotPassword;
public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordCommand>
{
    public ForgotPasswordValidator()
    {
        RuleFor(p => p.Email)
            .NotEmpty()
            .EmailAddress();
    }
}
