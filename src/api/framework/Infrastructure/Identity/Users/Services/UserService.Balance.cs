using Microsoft.EntityFrameworkCore;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;

namespace SolanaSpin.Framework.Infrastructure.Identity.Users.Services;
internal sealed partial class UserService
{
    public async Task<decimal> UpdateBalanceAsync(string userId, decimal delta, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException("user not found");

        user.Balance += delta;
        _ = await userManager.UpdateAsync(user);

        return user.Balance;
    }

    public async Task<decimal> RefreshBalanceAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException("user not found");
        var userAddress = user.DepositAddress
            ?? throw new NotFoundException("User does not have a deposit address");
        ulong userBalance = await blockchainService.GetBalanceAsync(userAddress);

        string latestBlockHash = await blockchainService.GetLatestBlockHashAsync();

        var userPrivateKey = user.DepositAddressPrivateKey
            ?? throw new NotFoundException("User does not have a private key for its deposit address");

        ulong transactionFee = await blockchainService.GetTransactionFeeAsync(latestBlockHash);

        if (userBalance > transactionFee)
        {
            ulong transferAmount = userBalance - transactionFee;
            string txHash = await blockchainService.TransferBalance(userAddress, userPrivateKey, transferAmount, latestBlockHash);

            _ = await transactionsRepository.AddAsync(new()
            {
                UserId = user.Id,
                Amount = transferAmount / 1_000_000_000m,
                Direction = TransactionDirection.Deposit,
                WithAddress = userAddress,
                Status = TransactionStatus.Completed,
                TxHash = txHash
            }, CancellationToken.None);

            user.Balance += transferAmount / 1_000_000_000m;
            _ = await userManager.UpdateAsync(user);
        }

        return user.Balance;
    }
}
