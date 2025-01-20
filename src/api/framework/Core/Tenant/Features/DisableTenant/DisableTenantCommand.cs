using MediatR;

namespace SolanaSpin.Framework.Core.Tenant.Features.DisableTenant;
public record DisableTenantCommand(
    string TenantId) : IRequest<DisableTenantResponse>;
