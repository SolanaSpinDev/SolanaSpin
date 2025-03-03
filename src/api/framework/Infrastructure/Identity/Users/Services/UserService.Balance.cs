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

        if (await walletService.IsDepositAvailableAsync(userAddress))
        {
            var userAddressPrivateKey = user.DepositAddressPrivateKey
                ?? throw new NotFoundException("User does not have a private key for its deposit address");

            (decimal amount, decimal fee, string txHash) = await walletService.ExecuteDepositAsync(userAddress, userAddressPrivateKey);

            _ = await transactionsRepository.AddAsync(new()
            {
                UserId = user.Id,
                Amount = amount,
                Direction = TransactionDirection.Deposit,
                WithAddress = userAddress,
                Status = TransactionStatus.Completed,
                TxHash = txHash,
                Fee = fee,
            }, CancellationToken.None);

            user.Balance += amount;
            _ = await userManager.UpdateAsync(user);
        }

        return user.Balance;
    }
}
