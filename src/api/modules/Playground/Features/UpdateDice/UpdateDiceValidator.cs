using FluentValidation;

namespace SolanaSpin.WebApi.Playground.Features.UpdateDice;
public class UpdateDiceValidator : AbstractValidator<UpdateDiceCommand>
{
    public UpdateDiceValidator()
    {
        RuleFor(p => p.Id).NotEmpty();
    }
}
