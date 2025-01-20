using Finbuckle.MultiTenant.Abstractions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Persistence;
using SolanaSpin.Framework.Infrastructure.Tenant;
using SolanaSpin.WebApi.Playground.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace SolanaSpin.WebApi.Playground.Persistence;
public sealed class PlaygroundDbContext : AppDbContext
{
    public PlaygroundDbContext(IMultiTenantContextAccessor<AppTenantInfo> multiTenantContextAccessor, DbContextOptions<PlaygroundDbContext> options, IPublisher publisher, IOptions<DatabaseOptions> settings)
        : base(multiTenantContextAccessor, options, publisher, settings)
    {
    }

    public DbSet<Dice> Dice { get; set; } = null!;
    public DbSet<Jackpot> Jackpots { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ArgumentNullException.ThrowIfNull(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PlaygroundDbContext).Assembly);
        modelBuilder.HasDefaultSchema(SchemaNames.Playground);
    }
}
