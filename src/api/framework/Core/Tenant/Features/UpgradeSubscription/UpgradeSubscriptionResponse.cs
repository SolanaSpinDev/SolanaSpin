namespace SolanaSpin.Framework.Core.Tenant.Features.UpgradeSubscription;
public record UpgradeSubscriptionResponse(
    DateTime NewValidity,
    string Tenant);
