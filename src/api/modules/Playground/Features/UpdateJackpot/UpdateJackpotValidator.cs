using FluentValidation;

namespace SolanaSpin.WebApi.Playground.Features.UpdateJackpot;
public class UpdateJackpotValidator : AbstractValidator<UpdateJackpotCommand>
{
    public UpdateJackpotValidator()
    {
        RuleFor(p => p.Id).NotEmpty();
    }
}
