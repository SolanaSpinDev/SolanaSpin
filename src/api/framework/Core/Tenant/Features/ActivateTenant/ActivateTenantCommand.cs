using MediatR;

namespace SolanaSpin.Framework.Core.Tenant.Features.ActivateTenant;
public record ActivateTenantCommand(
    string TenantId) : IRequest<ActivateTenantResponse>;
