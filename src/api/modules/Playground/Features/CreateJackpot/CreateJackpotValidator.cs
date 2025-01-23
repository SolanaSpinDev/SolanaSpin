using FluentValidation;

namespace SolanaSpin.WebApi.Playground.Features.CreateJackpot;
public class CreateJackpotValidator : AbstractValidator<CreateJackpotCommand>
{
    public CreateJackpotValidator()
    {
        RuleFor(p => p.Title).NotEmpty();

        RuleFor(p => p.Slug).NotEmpty();
    }
}
