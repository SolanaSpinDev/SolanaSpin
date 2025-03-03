using Solnet.Rpc.Models;

namespace SolanaSpin.Framework.Core.Blockchain;

public interface IBlockchainService
{
    public Task<string> GetLatestBlockHashAsync();
    public Task<TokenMintInfoDetails> GetTokenInfoAsync(string address);
    public Task<ulong> GetBalanceAsync(string address);
    public Task<TokenBalance> GetTokenBalanceAsync(string tokenAddress, string address);
    public Task<string> TransferBalanceAsync(string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<string> TransferBalanceAsync(string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
    public Task<string> TransferTokenBalanceAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<string> TransferTokenBalanceAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
    public Task ConfirmTransactionSignatureAsync(string signature);
    public Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
    public Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount);
    public Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations);
}
