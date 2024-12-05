using MediatR;

namespace FSH.Framework.Core.Tenant.Features.UpgradeSubscription;
public record UpgradeSubscriptionCommand(
    string Tenant,
    DateTime ExtendedExpiryDate) : IRequest<UpgradeSubscriptionResponse>;
