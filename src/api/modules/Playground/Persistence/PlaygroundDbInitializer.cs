using SolanaSpin.Framework.Core.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SolanaSpin.WebApi.Playground.Persistence;
internal sealed class PlaygroundDbInitializer(
    ILogger<PlaygroundDbInitializer> logger,
    PlaygroundDbContext context) : IDbInitializer
{
    public async Task MigrateAsync(CancellationToken cancellationToken)
    {
        if ((await context.Database.GetPendingMigrationsAsync(cancellationToken).ConfigureAwait(false)).Any())
        {
            await context.Database.MigrateAsync(cancellationToken).ConfigureAwait(false);
            logger.LogInformation("[{Tenant}] applied database migrations for playground module", context.TenantInfo!.Identifier);
        }
    }

    public Task SeedAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("[{Tenant}] seeding default playground data", context.TenantInfo!.Identifier);
        return Task.CompletedTask;
    }
}
