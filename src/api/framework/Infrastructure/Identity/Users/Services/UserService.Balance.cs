using FSH.Framework.Core.Caching;
using FSH.Framework.Core.Exceptions;
using SolanaSpin.WebApi.Shared.Authorization;
using Microsoft.EntityFrameworkCore;
using Mapster;
using Solnet.Wallet.Bip39;
using Solnet.Wallet;
using System.Diagnostics.Metrics;
using Solnet.Rpc;
using Solnet.Rpc.Core.Http;
using Solnet.Rpc.Builders;
using Solnet.Programs;

namespace FSH.Framework.Infrastructure.Identity.Users.Services;
internal sealed partial class UserService
{
    public async Task<decimal> UpdateBalanceAsync(string userId, decimal delta, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException("user not found");

        user.Balance += delta;
        await userManager.UpdateAsync(user);

        return user.Balance;
    }

    public async Task<decimal> RefreshBalanceAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException("user not found");

        var userAddress = user.DepositAddress
            ?? throw new Exception("User does not have a deposit address");
        ulong userBalance = await blockchainService.GetBalanceAsync(userAddress);

        bool isAdmin = await userManager.IsInRoleAsync(user, IdentityConstants.Roles.Admin);
        if (!isAdmin)
        {
            string latestBlockHash = await blockchainService.GetLatestBlockHashAsync();

            var userPrivateKey = user.DepositAddressPrivateKey
                ?? throw new Exception("User does not have a private key for its deposit address");

            ulong transactionFee = await blockchainService.GetTransactionFeeAsync(latestBlockHash);

            if (userBalance > transactionFee)
            {

                ulong transferAmount = userBalance - transactionFee;
                string txHash = await blockchainService.TransferBalance(userAddress, userPrivateKey, transferAmount, latestBlockHash);

                // TODO: Add deposit entry

                user.Balance += transferAmount / 1_000_000_000m;
                await userManager.UpdateAsync(user);
            }
        }
        else
        {
            user.Balance = userBalance / 1_000_000_000m;
            await userManager.UpdateAsync(user);
        }

        return user.Balance;
    }
}
