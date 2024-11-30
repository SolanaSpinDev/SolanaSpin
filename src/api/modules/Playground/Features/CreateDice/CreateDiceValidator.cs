using FluentValidation;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.CreateDice;
public class CreateDiceValidator : AbstractValidator<CreateDiceCommand>
{
    public CreateDiceValidator()
    {
        RuleFor(p => p.Title).NotEmpty();
        RuleFor(p => p.Slug).NotEmpty();
    }
}
