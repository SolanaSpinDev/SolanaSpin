namespace SolanaSpin.Framework.Core.Blockchain;

public interface IBlockchainService
{
    public Task<string> GetLatestBlockHashAsync();
    public Task<ulong> GetBalanceAsync(string address);
    public Task<ulong> GetTransactionFeeAsync(string? latestBlockHash = null);
    public Task<string> TransferBalance(string fromAddress, string fromPrivateKey, ulong transferAmount, string? latestBlockHash = null);
}
