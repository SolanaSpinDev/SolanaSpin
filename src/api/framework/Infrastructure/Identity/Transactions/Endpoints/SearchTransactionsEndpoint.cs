using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Identity.Transactions.Dtos;
using SolanaSpin.Framework.Core.Paging;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Core.Specifications;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class SearchTransactionsEndpoint
{
    public static RouteHandlerBuilder MapGetTransactionsListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapPost("/search", async (
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            [FromBody] PaginationFilter filter,
            CancellationToken cancellationToken) =>
        {
            var spec = new EntitiesByPaginationFilterSpec<AppTransaction, UserTransactionDto>(filter);
            return await repository.PaginatedListAsync(spec, filter, cancellationToken);
        })
        .WithName(nameof(SearchTransactionsEndpoint))
        .WithSummary("Gets a list of transactions with paging support")
        .RequirePermission("Permissions.Transactions.Search")
        .WithDescription("Gets a list of transactions with paging support");
    }
}
