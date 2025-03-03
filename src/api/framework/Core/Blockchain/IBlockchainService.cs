namespace SolanaSpin.Framework.Core.Blockchain;

public interface IBlockchainService
{
    public Task<ulong?> GetBalanceAsync(string address);
    public Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
    public Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
}
