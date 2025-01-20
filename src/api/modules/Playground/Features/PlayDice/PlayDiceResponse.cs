using System.Text.Json.Serialization;
using SolanaSpin.WebApi.Playground.Domain;

namespace SolanaSpin.WebApi.Playground.Features.PlayDice;
public record PlayDiceResult(
    [property: JsonIgnore] DiceDto Dice,
    int FaceIndex,
    decimal ReturnAmount,
    PlayDiceResult? InnerResult = null)
{
    [JsonIgnore] public Face Face => Dice.Faces.ElementAt(FaceIndex);
    [JsonIgnore] public FaceResultType ResultType => Face.ResultType;
    [JsonIgnore] public string? ResultValue => Face.ResultValue;

    public decimal GetNetAmount(decimal playAmount)
    {
        return ReturnAmount - playAmount + (InnerResult?.GetNetAmount(playAmount) ?? 0);
    }
}
public record PlayDiceResponse(
    [property: JsonIgnore] decimal OldBalance,
    [property: JsonIgnore] PlayDiceRequest Request,
    PlayDiceResult Result)
{
    public decimal NetAmount => Result.GetNetAmount(Request.PlayAmount);
    [JsonIgnore] public decimal NewBalance => OldBalance + NetAmount;
}
