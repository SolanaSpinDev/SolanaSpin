using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SolanaSpin.Framework.Core.Blockchain;
using Solnet.Programs;
using Solnet.Rpc;
using Solnet.Rpc.Builders;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace SolanaSpin.Framework.Infrastructure.Blockchain;

internal class BlockchainService : IBlockchainService
{
    private readonly ILogger<BlockchainService> _logger;
    private readonly BlockchainOptions _blockchainOptions;
    private readonly IRpcClient _rpcClient;

    public BlockchainService(
        ILogger<BlockchainService> logger,
        IConfiguration config)
    {
        _blockchainOptions = config.GetSection(nameof(BlockchainOptions)).Get<BlockchainOptions>()!;
        _rpcClient = ClientFactory.GetClient((Cluster)_blockchainOptions.Cluster);
        _logger = logger;
    }

    public async Task<string> GetLatestBlockHashAsync()
    {
        var latestBlockHashResult = await _rpcClient.GetLatestBlockHashAsync();
        return !latestBlockHashResult.WasSuccessful
            ? throw new Exception("Failed to get latest block hash: " + latestBlockHashResult.Reason)
            : latestBlockHashResult.Result.Value.Blockhash;
    }

    public async Task<TokenMintInfoDetails> GetTokenInfoAsync(string address)
    {
        var tokenMintInfoResult = await _rpcClient.GetTokenMintInfoAsync(address);
        return !tokenMintInfoResult.WasSuccessful
            ? throw new Exception("Failed to get token mint info: " + tokenMintInfoResult.Reason)
            : tokenMintInfoResult.Result.Value.Data.Parsed.Info;
    }

    public async Task<ulong> GetBalanceAsync(string address)
    {
        var balanceResult = await _rpcClient.GetBalanceAsync(address);
        return !balanceResult.WasSuccessful
            ? throw new Exception("Failed to get balance: " + balanceResult.Reason)
            : balanceResult.Result.Value;
    }

    public async Task<TokenBalance> GetTokenBalanceAsync(string tokenAddress, string address)
    {
        var tokenAccountsResult = await _rpcClient.GetTokenAccountsByOwnerAsync(address, tokenAddress);
        var tokenAccount = !tokenAccountsResult.WasSuccessful
            ? throw new Exception("Failed to get token account: " + tokenAccountsResult.Reason)
            : tokenAccountsResult.Result.Value.FirstOrDefault()
            ?? throw new Exception("Token account not found.");

        var tokenBalanceResult = await _rpcClient.GetTokenAccountBalanceAsync(tokenAccount.PublicKey);
        return !tokenBalanceResult.WasSuccessful
            ? throw new Exception("Failed to get token balance: " + tokenBalanceResult.Reason)
            : tokenBalanceResult.Result.Value;
    }

    public async Task<string> TransferBalanceAsync(string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount)
    {
        var latestBlockHash = await GetLatestBlockHashAsync();
        var account = new Account(fromAddressPrivateKey, fromAddress);

        var transaction = new TransactionBuilder()
            .SetRecentBlockHash(latestBlockHash)
            .SetFeePayer(account.PublicKey)
            .AddInstruction(
                SystemProgram.Transfer(
                    account.PublicKey,
                    new PublicKey(toAddress),
                    transferAmount))
            .Build(account);

        var sendTransactionResult = await _rpcClient.SendTransactionAsync(transaction);
        if (!sendTransactionResult.WasSuccessful)
        {
            throw new Exception("Transaction failed: " + sendTransactionResult.Reason);
        }
        return sendTransactionResult.Result;
    }

    public async Task<string> TransferBalanceAsync(string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations)
    {
        var latestBlockHash = await GetLatestBlockHashAsync();
        var account = new Account(fromAddressPrivateKey, fromAddress);
        var transactionBuilder = new TransactionBuilder()
            .SetRecentBlockHash(latestBlockHash)
            .SetFeePayer(account.PublicKey);

        foreach ((string toAddress, ulong transferAmount) in destinations)
        {
            transactionBuilder = transactionBuilder.AddInstruction(
                SystemProgram.Transfer(
                    account.PublicKey,
                    new PublicKey(toAddress),
                    transferAmount));
        }

        var transaction = transactionBuilder.Build(account);
        var sendTransactionResult = await _rpcClient.SendTransactionAsync(transaction);
        if (!sendTransactionResult.WasSuccessful)
        {
            throw new Exception("Transaction failed: " + sendTransactionResult.Reason);
        }
        return sendTransactionResult.Result;
    }

    public async Task<string> TransferTokenBalanceAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount)
    {
        var latestBlockHash = await GetLatestBlockHashAsync();
        var account = new Account(fromAddressPrivateKey, fromAddress);

        var sourceAccountResult = await _rpcClient.GetTokenAccountsByOwnerAsync(fromAddress, tokenAddress);
        var sourceAccount = !sourceAccountResult.WasSuccessful
            ? throw new Exception("Failed to get token accounts: " + sourceAccountResult.Reason)
            : sourceAccountResult.Result.Value.FirstOrDefault()
            ?? throw new Exception("Token account not found.");

        var destinationAccountResult = await _rpcClient.GetTokenAccountsByOwnerAsync(toAddress, tokenAddress);
        var destinationAccount = !destinationAccountResult.WasSuccessful
            ? throw new Exception("Failed to get token accounts: " + destinationAccountResult.Reason)
            : destinationAccountResult.Result.Value.FirstOrDefault()
            ?? throw new Exception("Token account not found.");

        var transaction = new TransactionBuilder()
            .SetRecentBlockHash(latestBlockHash)
            .SetFeePayer(account.PublicKey)
            .AddInstruction(
                TokenProgram.Transfer(
                    new PublicKey(sourceAccount.PublicKey),
                    new PublicKey(destinationAccount.PublicKey),
                    transferAmount,
                    account.PublicKey))
            .Build(account);

        var sendTransactionResult = await _rpcClient.SendTransactionAsync(transaction);
        if (!sendTransactionResult.WasSuccessful)
        {
            throw new Exception("Transaction failed: " + sendTransactionResult.Reason);
        }
        return sendTransactionResult.Result;
    }

    public async Task<string> TransferTokenBalanceAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations)
    {
        var latestBlockHash = await GetLatestBlockHashAsync();
        var account = new Account(fromAddressPrivateKey, fromAddress);

        var sourceAccountResult = await _rpcClient.GetTokenAccountsByOwnerAsync(fromAddress, tokenAddress);
        var sourceAccount = !sourceAccountResult.WasSuccessful
            ? throw new Exception("Failed to get token accounts: " + sourceAccountResult.Reason)
            : sourceAccountResult.Result.Value.FirstOrDefault()
            ?? throw new Exception("Token account not found.");

        var transactionBuilder = new TransactionBuilder()
            .SetRecentBlockHash(latestBlockHash)
            .SetFeePayer(account.PublicKey);

        foreach ((string toAddress, ulong transferAmount) in destinations)
        {
            var destinationAccountResult = await _rpcClient.GetTokenAccountsByOwnerAsync(toAddress, tokenAddress);
            var destinationAccount = !destinationAccountResult.WasSuccessful
                ? throw new Exception("Failed to get token accounts: " + destinationAccountResult.Reason)
                : destinationAccountResult.Result.Value.FirstOrDefault()
                ?? throw new Exception("Token account not found.");

            transactionBuilder = transactionBuilder.AddInstruction(
                TokenProgram.Transfer(
                    new PublicKey(sourceAccount.PublicKey),
                    new PublicKey(destinationAccount.PublicKey),
                    transferAmount,
                    account.PublicKey));
        }

        var transaction = transactionBuilder.Build(account);
        var sendTransactionResult = await _rpcClient.SendTransactionAsync(transaction);
        if (!sendTransactionResult.WasSuccessful)
        {
            throw new Exception("Transaction failed: " + sendTransactionResult.Reason);
        }
        return sendTransactionResult.Result;
    }

    public async Task ConfirmTransactionSignatureAsync(string signature)
    {
        bool success = false;
        int retries = 0;
        while (!success)
        {
            var getStatusResult = await _rpcClient.GetSignatureStatusesAsync([signature]);
            success = getStatusResult.WasSuccessful && getStatusResult.Result.Value.FirstOrDefault() is not null;
            if (!success)
            {
                await Task.Delay(1000);
                if (retries++ > 60)
                {
                    throw new Exception("Confirmation failed: " + getStatusResult.Reason);
                }
            }
        }
    }

    public async Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount)
    {
        bool success = false;
        int retries = 0;
        string txHash = string.Empty;
        while (!success)
        {
            try
            {
                txHash = await TransferBalanceAsync(fromAddress, fromAddressPrivateKey, toAddress, transferAmount);
                await ConfirmTransactionSignatureAsync(txHash);
                success = true;
            }
            catch (Exception ex)
            {
                await Task.Delay(1000);
                if (retries++ > 60)
                {
                    _logger.LogError(ex, "Failed to transfer balance and confirm transaction. Canceled.");
                    break;
                }
                _logger.LogWarning(ex, "Failed to transfer balance and confirm transaction. Retrying...");
            }
        }
        return (txHash, success);
    }

    public async Task<(string txHash, bool success)> TransferBalanceAndConfirmAsync(string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations)
    {
        bool success = false;
        int retries = 0;
        string txHash = string.Empty;
        while (!success)
        {
            try
            {
                txHash = await TransferBalanceAsync(fromAddress, fromAddressPrivateKey, destinations);
                await ConfirmTransactionSignatureAsync(txHash);
                success = true;
            }
            catch (Exception ex)
            {
                await Task.Delay(1000);
                if (retries++ > 60)
                {
                    _logger.LogError(ex, "Failed to transfer balance and confirm transaction. Canceled.");
                    break;
                }
                _logger.LogWarning(ex, "Failed to transfer balance and confirm transaction. Retrying...");
            }
        }
        return (txHash, success);
    }

    public async Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, string toAddress, ulong transferAmount)
    {
        bool success = false;
        int retries = 0;
        string txHash = string.Empty;
        while (!success)
        {
            try
            {
                txHash = await TransferTokenBalanceAsync(tokenAddress, fromAddress, fromAddressPrivateKey, toAddress, transferAmount);
                await ConfirmTransactionSignatureAsync(txHash);
                success = true;
            }
            catch (Exception ex)
            {
                await Task.Delay(1000);
                if (retries++ > 60)
                {
                    _logger.LogError(ex, "Failed to transfer balance and confirm transaction. Canceled.");
                    break;
                }
                _logger.LogWarning(ex, "Failed to transfer balance and confirm transaction. Retrying...");
            }
        }
        return (txHash, success);
    }

    public async Task<(string txHash, bool success)> TransferTokenBalanceAndConfirmAsync(string tokenAddress, string fromAddress, string fromAddressPrivateKey, IEnumerable<(string toAddress, ulong transferAmount)> destinations)
    {
        bool success = false;
        int retries = 0;
        string txHash = string.Empty;
        while (!success)
        {
            try
            {
                txHash = await TransferTokenBalanceAsync(tokenAddress, fromAddress, fromAddressPrivateKey, destinations);
                await ConfirmTransactionSignatureAsync(txHash);
                success = true;
            }
            catch (Exception ex)
            {
                await Task.Delay(1000);
                if (retries++ > 60)
                {
                    _logger.LogError(ex, "Failed to transfer balance and confirm transaction. Canceled.");
                    break;
                }
                _logger.LogWarning(ex, "Failed to transfer balance and confirm transaction. Retrying...");
            }
        }
        return (txHash, success);
    }
}
