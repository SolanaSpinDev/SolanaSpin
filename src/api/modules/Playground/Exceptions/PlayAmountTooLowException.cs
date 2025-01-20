using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class PlayAmountTooLowException : BadRequestException
{
    public PlayAmountTooLowException(decimal minimumPlayAmount, decimal playAmount)
        : base($"play amount {playAmount} is lower than {minimumPlayAmount}")
    {
    }
}
