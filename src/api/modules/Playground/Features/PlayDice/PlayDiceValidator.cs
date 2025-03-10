﻿using FluentValidation;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public class PlayDiceValidator : AbstractValidator<PlayDiceRequest>
{
    public PlayDiceValidator()
    {
        RuleFor(p => p.DiceSlug).NotEmpty();

        RuleFor(p => p.PlayAmount).GreaterThan(0);
    }
}
