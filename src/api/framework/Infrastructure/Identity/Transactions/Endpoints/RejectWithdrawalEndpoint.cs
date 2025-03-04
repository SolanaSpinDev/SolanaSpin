using System.Threading;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Identity.Transactions.Features.RejectWithdrawal;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;
using SolanaSpin.Framework.Infrastructure.Identity.Users.Services;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class RejectWithdrawalEndpoint
{
    public static RouteHandlerBuilder MapRejectWithdrawalEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/reject", async (
            [FromBody] RejectWithdrawalCommand request,
            [FromServices] IValidator<RejectWithdrawalCommand> validator,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            [FromServices] ICurrentUser currentUser,
            [FromServices] IUserService userService,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var transaction = await repository.GetByIdAsync(request.TransactionId)
                ?? throw new NotFoundException("transaction not found");

            if (transaction.Direction != TransactionDirection.Withdrawal)
            {
                throw new BadRequestException("transaction is not withdrawal");
            }

            if (transaction.Status != TransactionStatus.Pending)
            {
                throw new BadRequestException("transaction is not pending");
            }

            transaction.Status = TransactionStatus.Failed;
            transaction.Reason = request.Reason;
            await repository.UpdateAsync(transaction);

            var user = await userService.GetAsync(currentUser.GetUserId().ToString(), cancellationToken);
            _ = user ?? throw new NotFoundException("user not found");
            _ = await userService.UpdateBalanceAsync(transaction.UserId, transaction.Amount, cancellationToken);

        })
            .WithName(nameof(RejectWithdrawalEndpoint))
            .WithSummary("Reject a withdrawal")
            .RequirePermission("Permissions.Transactions.Update")
            .WithDescription("Reject a withdrawal");
    }
}
