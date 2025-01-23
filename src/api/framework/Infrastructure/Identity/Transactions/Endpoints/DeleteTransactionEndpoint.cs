using System.ComponentModel.DataAnnotations;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.Framework.Core.Exceptions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth.Policy;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;

public static class DeleteTransactionEndpoint
{
    public static RouteHandlerBuilder MapDeleteTransactionEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapDelete("/{id:guid}", async (
            Guid id,
            [FromKeyedServices("identity:transactions")] IRepository<AppTransaction> repository,
            CancellationToken cancellationToken) =>
        {
            var transaction = await repository.GetByIdAsync(id, cancellationToken)
                ?? throw new NotFoundException("transaction not found");

            await repository.DeleteAsync(transaction, cancellationToken);
        })
            .WithName(nameof(DeleteTransactionEndpoint))
            .WithSummary("Delete a transaction by ID")
            .RequirePermission("Permissions.Transactions.Delete")
            .WithDescription("Remove a transaction by its ID.");
    }
}
