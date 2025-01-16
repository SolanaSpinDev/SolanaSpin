﻿using FluentValidation;
using MediatR;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public class PlayDiceValidator : AbstractValidator<PlayDiceRequest>
{
    public PlayDiceValidator(
        ISender mediator)
    {
        RuleFor(p => p.DiceSlug).NotEmpty();

        RuleFor(p => p.PlayAmount).GreaterThan(0);
    }
}
