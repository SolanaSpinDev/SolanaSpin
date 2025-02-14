﻿using SolanaSpin.Framework.Core.Blockchain;
using Microsoft.Extensions.Configuration;
using Solnet.Programs;
using Solnet.Rpc;
using Solnet.Rpc.Builders;
using Solnet.Rpc.Models;
using Solnet.Wallet;
using System.Runtime.Intrinsics.Arm;

namespace SolanaSpin.Framework.Infrastructure.Blockchain;

internal class BlockchainService : IBlockchainService
{
    private readonly BlockchainOptions _blockchainOptions;
    private readonly IRpcClient _rpcClient;

    public BlockchainService(
        IConfiguration config)
    {
        _blockchainOptions = config.GetSection(nameof(BlockchainOptions)).Get<BlockchainOptions>()!;
        _rpcClient = ClientFactory.GetClient((Cluster)_blockchainOptions.Cluster);
    }

    public async Task<string> GetLatestBlockHashAsync()
    {
        var latestBlockHashResult = await _rpcClient.GetLatestBlockHashAsync();
        return !latestBlockHashResult.WasSuccessful
            ? throw new Exception("Failed to get latest block hash: " + latestBlockHashResult.Reason)
            : latestBlockHashResult.Result.Value.Blockhash;
    }

    public async Task<ulong> GetBalanceAsync(string address)
    {
        var balanceResult = await _rpcClient.GetBalanceAsync(address);
        return !balanceResult.WasSuccessful
            ? throw new Exception("Failed to get balance: " + balanceResult.Reason)
            : balanceResult.Result.Value;
    }

    public async Task<ulong> GetTransactionFeeAsync(string? latestBlockHash = null)
    {
        await Task.CompletedTask;
        return 5_000;

        //latestBlockHash ??= await GetLatestBlockHashAsync();
        //var feeCalculatorResult = await _rpcClient.GetFeeCalculatorForBlockhashAsync(latestBlockHash);
        //return !feeCalculatorResult.WasSuccessful
        //    ? throw new Exception("Failed to get fee calculator: " + feeCalculatorResult.Reason)
        //    : feeCalculatorResult.Result.Value.FeeCalculator.LamportsPerSignature;
    }

    public async Task<string> TransferBalance(string fromAddress, string fromPrivateKey, ulong transferAmount, string? latestBlockHash = null)
    {
        latestBlockHash ??= await GetLatestBlockHashAsync();
        var account = new Account(fromPrivateKey, fromAddress);
        var transaction = new TransactionBuilder()
            .SetRecentBlockHash(latestBlockHash)
            .SetFeePayer(account.PublicKey)
            .AddInstruction(
                SystemProgram.Transfer(
                    account.PublicKey,
                    new PublicKey(_blockchainOptions.CollectorAddress),
                    transferAmount))
            .Build(account);
        var sendTransactionResult = await _rpcClient.SendTransactionAsync(transaction);
        if (!sendTransactionResult.WasSuccessful)
        {
            throw new Exception("Transaction failed: " + sendTransactionResult.Reason);
        }
        var signature = sendTransactionResult.Result;

        bool success = false;
        int retries = 0;
        while (!success)
        {
            await Task.Delay(1000);
            var getStatusResult = await _rpcClient.GetSignatureStatusesAsync([signature]);
            success = getStatusResult.WasSuccessful && getStatusResult.Result.Value.FirstOrDefault() is not null;
            if (!success && retries++ > 60)
            {
                throw new Exception("Transaction failed: " + getStatusResult.Reason);
            }
        }

        return signature;
    }
}
