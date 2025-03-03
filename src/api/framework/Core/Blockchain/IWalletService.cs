namespace SolanaSpin.Framework.Core.Blockchain;

public interface IWalletService
{
    public Task<bool> IsDepositAvailableAsync(string userAddress);
    public Task<(decimal amount, decimal fee, string txHash)> ExecuteDepositAsync(string userAddress, string userAddressPrivateKey, bool simulate = false);
    public Task<bool> IsWithdrawalAvailableAsync(decimal amount);
    public Task<(decimal amount, decimal fee, string txHash)> ExecuteWithdrawalAsync(string toAddress, decimal amount, bool simulate = false);
}
