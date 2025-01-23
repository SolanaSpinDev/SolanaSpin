using Mapster;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class GetTransactionEndpoint
{
    public static RouteHandlerBuilder MapGetTransactionEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/{id:guid}", async (
            string id,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            [FromServices] ICurrentUser currentUser,
            CancellationToken cancellationToken) =>
        {
            var transaction = await repository.GetByIdAsync(id, cancellationToken)
                ?? throw new NotFoundException("transaction not found");

            return !currentUser.IsInRole(IdentityConstants.Roles.Admin) && transaction.UserId != currentUser.GetUserId().ToString()
                ? throw new UnauthorizedException()
                : transaction.Adapt<UserTransactionDto>();
        })
        .WithName(nameof(GetTransactionEndpoint))
        .WithSummary("Get transaction by ID")
        .RequirePermission("Permissions.Transactions.View")
        .WithDescription("Retrieve the transaction by its ID.");
    }
}
