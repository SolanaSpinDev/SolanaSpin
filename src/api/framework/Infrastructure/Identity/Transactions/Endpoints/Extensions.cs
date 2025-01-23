using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.Framework.Infrastructure.Identity.Transactions.Endpoints;
internal static class Extensions
{
    public static IEndpointRouteBuilder MapTransactionEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapRequestWithdrawalEndpoint();
        app.MapApproveWithdrawalEndpoint();
        app.MapRejectWithdrawalEndpoint();
        app.MapDeleteTransactionEndpoint();
        app.MapGetTransactionEndpoint();
        app.MapGetTransactionsListEndpoint();
        app.MapGetMyTransactionsListEndpoint();
        return app;
    }
}
