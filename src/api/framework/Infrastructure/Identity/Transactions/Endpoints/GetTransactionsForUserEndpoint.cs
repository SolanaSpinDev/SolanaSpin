using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class GetTransactionsForUserEndpoint
{
    public static RouteHandlerBuilder MapGetMyTransactionsListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("/for-user/{id:guid}", async (
            Guid id,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            [FromServices] ICurrentUser currentUser,
            CancellationToken cancellationToken) =>
        {
            if (!currentUser.IsInRole(IdentityConstants.Roles.Admin) && id != currentUser.GetUserId())
            {
                throw new UnauthorizedException();
            }

            var spec = new EntitiesByBaseFilterSpec<AppTransaction, TransactionDto>(new()
            {
                AdvancedFilter = new()
                {
                    Field = nameof(AppTransaction.UserId),
                    Operator = FilterOperator.EQ,
                    Value = JsonDocument.Parse($"\"{currentUser.GetUserId()}\"").RootElement
                },
            });
            return await repository.ListAsync(spec, cancellationToken);
        })
        .WithName(nameof(GetTransactionsForUserEndpoint))
        .WithSummary("Gets a list of transactions for specific user")
        .RequirePermission("Permissions.Transactions.View")
        .WithDescription("Gets a list of transactions for specific user");
    }
}
