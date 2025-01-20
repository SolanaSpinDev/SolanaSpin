using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class PlayAmountTooHighException : BadRequestException
{
    public PlayAmountTooHighException(decimal maximumPlayAmount, decimal playAmount)
        : base($"play amount {playAmount} is higher than {maximumPlayAmount}")
    {
    }
}
