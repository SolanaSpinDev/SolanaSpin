using System.Globalization;

namespace SolanaSpin.Framework.Core.Exceptions;
public sealed class InsufficientBalanceException : BadRequestException
{
    public InsufficientBalanceException(decimal currentBalance, decimal requiredBalance)
        : base($"balance of {currentBalance.ToString(CultureInfo.GetCultureInfo("en-US"))} is lower than required {requiredBalance.ToString(CultureInfo.GetCultureInfo("en-US"))} amount")
    {
    }
}
