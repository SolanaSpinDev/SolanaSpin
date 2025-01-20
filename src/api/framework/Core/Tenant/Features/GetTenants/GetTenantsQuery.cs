using MediatR;

namespace SolanaSpin.Framework.Core.Tenant.Features.GetTenants;
public sealed class GetTenantsQuery : IRequest<List<TenantDto>>;
