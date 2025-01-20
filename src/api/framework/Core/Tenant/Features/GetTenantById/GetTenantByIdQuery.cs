using MediatR;

namespace SolanaSpin.Framework.Core.Tenant.Features.GetTenantById;
public record GetTenantByIdQuery(string TenantId) : IRequest<TenantDto>;
