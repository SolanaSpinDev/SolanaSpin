﻿using SolanaSpin.Framework.Core.Blockchain;
using Microsoft.Extensions.Configuration;
using Solnet.Programs;
using Solnet.Rpc;
using Solnet.Rpc.Builders;
using Solnet.Rpc.Models;
using Solnet.Wallet;
using System.Runtime.Intrinsics.Arm;

namespace SolanaSpin.Framework.Infrastructure.Blockchain;

internal class WalletService : IWalletService
{
    private readonly BlockchainOptions _blockchainOptions;
    private readonly IRpcClient _rpcClient;
    private readonly IBlockchainService _blockchainService;

    public WalletService(
        IConfiguration config,
        IBlockchainService blockchainService)
    {
        _blockchainOptions = config.GetSection(nameof(BlockchainOptions)).Get<BlockchainOptions>()!;
        _rpcClient = ClientFactory.GetClient((Cluster)_blockchainOptions.Cluster);
        _blockchainService = blockchainService;
    }

    public async Task<bool> IsDepositAvailableAsync(string userAddress)
    {
        ulong balance = await _blockchainService.GetBalanceAsync(userAddress);
        return balance > _blockchainOptions.TransactionFee * 2;
    }

    public async Task<(decimal amount, decimal fee, string txHash)> ExecuteDepositAsync(string userAddress, string userAddressPrivateKey, bool simulate = false)
    {
        ulong balance = await _blockchainService.GetBalanceAsync(userAddress) - 2 * _blockchainOptions.TransactionFee;
        ulong amount = Convert.ToUInt64(balance * (1 - _blockchainOptions.DepositFee));
        ulong fee = balance - amount;
        string txHash = string.Empty;

        if (!simulate)
        {
            (txHash, bool success) = await _blockchainService.TransferBalanceAndConfirmAsync(
                userAddress, 
                userAddressPrivateKey, 
                [
                    (_blockchainOptions.FeeCollectorAddress, fee),
                    (_blockchainOptions.HotWalletAddress, amount - 50_000)
                ]);
            if (!success)
            {
                throw new Exception("Failed to complete deposit.");
            }
        }

        return (amount * _blockchainOptions.BalanceConversionRate, fee * _blockchainOptions.BalanceConversionRate, txHash);
    }

    public async Task<bool> IsWithdrawalAvailableAsync(decimal amount)
    {
        ulong balance = await _blockchainService.GetBalanceAsync(_blockchainOptions.HotWalletAddress);
        return balance > amount / _blockchainOptions.BalanceConversionRate + _blockchainOptions.TransactionFee * 2;
    }

    public async Task<(decimal amount, decimal fee, string txHash)> ExecuteWithdrawalAsync(string toAddress, decimal amount, bool simulate = false)
    {
        ulong convertedAmount = Convert.ToUInt64(amount / _blockchainOptions.BalanceConversionRate);
        ulong amountAfterTax = Convert.ToUInt64(convertedAmount * (1 - _blockchainOptions.WithdrawalFee));
        ulong fee = convertedAmount - amountAfterTax;
        string txHash = string.Empty;

        if (!simulate)
        {
            (txHash, bool success) = await _blockchainService.TransferBalanceAndConfirmAsync(
                _blockchainOptions.HotWalletAddress,
                _blockchainOptions.HotWalletAddressAddressPrivateKey,
                [
                    (_blockchainOptions.FeeCollectorAddress, fee),
                    (toAddress, amountAfterTax)
                ]);
            if (!success)
            {
                throw new Exception("Failed to complete deposit.");
            }
        }

        return (amountAfterTax * _blockchainOptions.BalanceConversionRate, fee * _blockchainOptions.BalanceConversionRate, txHash);
    }
}
