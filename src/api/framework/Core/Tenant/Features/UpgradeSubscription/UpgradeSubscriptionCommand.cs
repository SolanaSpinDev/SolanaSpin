using MediatR;

namespace SolanaSpin.Framework.Core.Tenant.Features.UpgradeSubscription;
public record UpgradeSubscriptionCommand(
    string Tenant,
    DateTime ExtendedExpiryDate) : IRequest<UpgradeSubscriptionResponse>;
