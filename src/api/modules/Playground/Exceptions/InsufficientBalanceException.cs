using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class InsufficientBalanceException : BadRequestException
{
    public InsufficientBalanceException(decimal currentBalance, decimal requiredBalance)
        : base($"balance of {currentBalance} is lower than required {requiredBalance} amount")
    {
    }
}
