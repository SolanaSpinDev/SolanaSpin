using FluentValidation;
using Mapster;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Identity.Transactions.Features.RejectWithdrawal;
using SolanaSpin.Framework.Core.Identity.Transactions.Features.RequestWithdrawal;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class RequestWithdrawalEndpoint
{
    public static RouteHandlerBuilder MapRequestWithdrawalEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/request", async (
            RequestWithdrawalCommand request,
            [FromServices] IValidator<RequestWithdrawalCommand> validator,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            [FromServices] ICurrentUser currentUser,
            [FromServices] IUserService userService,
            CancellationToken cancellationToken) =>
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var user = await userService.GetAsync(currentUser.GetUserId().ToString(), cancellationToken);
            _ = user ?? throw new NotFoundException("user not found");

            if (user.Balance < request.Amount)
            {
                throw new InsufficientBalanceException(user.Balance, request.Amount);
            }

            _ = await userService.UpdateBalanceAsync(user.Id.ToString(), -request.Amount, cancellationToken);

            var transaction = new AppTransaction
            {
                UserId = user.Id.ToString(),
                Amount = request.Amount,
                Direction = TransactionDirection.Withdrawal,
                WithAddress = request.ToAddress,
                Status = TransactionStatus.Pending
            };
            transaction = await repository.AddAsync(transaction, cancellationToken);
            return transaction.Adapt<UserTransactionDto>();
        })
        .WithName(nameof(RequestWithdrawalEndpoint))
        .WithSummary("Request a withdrawal")
        .RequirePermission("Permissions.Transactions.Request")
        .WithDescription("Request a withdrawal");
    }
}
