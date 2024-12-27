using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public record PlayDiceResult(
    DiceDto Dice,
    int FaceIndex,
    decimal ReturnAmount,
    PlayDiceResult? InnerResult = null)
{
    public Face Face => Dice.Faces.ElementAt(FaceIndex);
    public FaceResultType ResultType => Face.ResultType;
    public string? ResultValue => Face.ResultValue;

    public decimal GetNetAmount(decimal playAmount)
    {
        return ReturnAmount - playAmount + (InnerResult?.GetNetAmount(playAmount) ?? 0);
    }
}
public record PlayDiceResponse(
    decimal OldBalance,
    PlayDiceRequest Request,
    PlayDiceResult Result)
{
    public decimal NetAmount => Result.GetNetAmount(Request.PlayAmount);

    public decimal NewBalance => OldBalance + NetAmount;
}
