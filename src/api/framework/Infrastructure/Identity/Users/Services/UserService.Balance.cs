using FSH.Framework.Core.Caching;
using FSH.Framework.Core.Exceptions;
using SolanaSpin.WebApi.Shared.Authorization;
using Microsoft.EntityFrameworkCore;
using Mapster;

namespace FSH.Framework.Infrastructure.Identity.Users.Services;
internal sealed partial class UserService
{
    public async Task<decimal> UpdateBalanceAsync(string userId, decimal balanceDelta, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException("user not found");

        user.Balance += balanceDelta;
        await userManager.UpdateAsync(user);

        return user.Balance;
    }
}
