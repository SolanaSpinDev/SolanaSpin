using Finbuckle.MultiTenant.Abstractions;
using Finbuckle.MultiTenant.EntityFrameworkCore;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Identity.RoleClaims;
using SolanaSpin.Framework.Infrastructure.Identity.Roles;
using SolanaSpin.Framework.Infrastructure.Identity.Users;
using SolanaSpin.Framework.Infrastructure.Persistence;
using SolanaSpin.Framework.Infrastructure.Tenant;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SolanaSpin.Framework.Infrastructure.Identity.Transactions;

namespace SolanaSpin.Framework.Infrastructure.Identity.Persistence;
public class IdentityDbContext : MultiTenantIdentityDbContext<AppUser,
    AppRole,
    string,
    IdentityUserClaim<string>,
    IdentityUserRole<string>,
    IdentityUserLogin<string>,
    AppRoleClaim,
    IdentityUserToken<string>>
{
    private readonly DatabaseOptions _settings;
    private new AppTenantInfo TenantInfo { get; set; }

    public DbSet<AppTransaction> Transactions { get; set; } = null!;

    public IdentityDbContext(IMultiTenantContextAccessor<AppTenantInfo> multiTenantContextAccessor, DbContextOptions<IdentityDbContext> options, IOptions<DatabaseOptions> settings) : base(multiTenantContextAccessor, options)
    {
        _settings = settings.Value;
        TenantInfo = multiTenantContextAccessor.MultiTenantContext.TenantInfo!;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(IdentityDbContext).Assembly);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!string.IsNullOrWhiteSpace(TenantInfo?.ConnectionString))
        {
            optionsBuilder.ConfigureDatabase(_settings.Provider, TenantInfo.ConnectionString);
        }
    }
}
