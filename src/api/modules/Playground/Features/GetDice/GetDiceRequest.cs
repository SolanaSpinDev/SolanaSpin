using MediatR;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.GetDice;
public record GetDiceRequest(
    Guid Id) : IRequest<DiceDto>;
