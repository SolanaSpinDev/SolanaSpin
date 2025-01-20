using Finbuckle.MultiTenant.Abstractions;

namespace SolanaSpin.Framework.Infrastructure.Tenant.Abstractions;
public interface IAppTenantInfo : ITenantInfo
{
    string? ConnectionString { get; set; }
}
