﻿using FluentValidation;

namespace SolanaSpin.Framework.Core.Identity.Roles.Features.UpdatePermissions;
public class UpdatePermissionsValidator : AbstractValidator<UpdatePermissionsCommand>
{
    public UpdatePermissionsValidator()
    {
        RuleFor(r => r.RoleId)
            .NotEmpty();

        RuleFor(r => r.Permissions)
            .NotNull();
    }
}
