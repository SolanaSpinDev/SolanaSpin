﻿using System.Threading;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Identity.Transactions.Features.ApproveWithdrawal;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class ApproveWithdrawalEndpoint
{
    public static RouteHandlerBuilder MapApproveWithdrawalEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/approve", async (
            [FromBody] ApproveWithdrawalCommand request,
            [FromServices] IValidator<ApproveWithdrawalCommand> validator,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var transaction = await repository.GetByIdAsync(request.TransactionId, cancellationToken)
                ?? throw new NotFoundException("transaction not found");

            if (transaction.Direction != TransactionDirection.Withdrawal)
            {
                throw new BadRequestException("transaction is not withdrawal");
            }

            if (transaction.Status != TransactionStatus.Pending)
            {
                throw new BadRequestException("transaction is not pending");
            }

            // TODO: Transfer funds to the user's account
            var txHash = string.Empty;

            transaction.Status = TransactionStatus.Completed;
            transaction.Reason = request.Reason;
            transaction.TxHash = txHash;
            await repository.UpdateAsync(transaction, cancellationToken);
        })
            .WithName(nameof(ApproveWithdrawalEndpoint))
            .WithSummary("Approve a withdrawal")
            .RequirePermission("Permissions.Transactions.Approve")
            .WithDescription("Approve a withdrawal");
    }
}
