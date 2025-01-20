using System.Collections.ObjectModel;

namespace SolanaSpin.WebApi.Shared.Authorization;

public static class AppAction
{
    public const string View = nameof(View);
    public const string Search = nameof(Search);
    public const string Create = nameof(Create);
    public const string Update = nameof(Update);
    public const string Delete = nameof(Delete);
    public const string Export = nameof(Export);
    public const string Request = nameof(Request);
    public const string UpgradeSubscription = nameof(UpgradeSubscription);
    public const string Play = nameof(Play);
}

public static class AppResource
{
    public const string Tenants = nameof(Tenants);
    public const string Dashboard = nameof(Dashboard);
    public const string Hangfire = nameof(Hangfire);
    public const string Users = nameof(Users);
    public const string UserRoles = nameof(UserRoles);
    public const string Roles = nameof(Roles);
    public const string RoleClaims = nameof(RoleClaims);
    public const string Transactions = nameof(Transactions);
    public const string Dice = nameof(Dice);
    public const string Jackpots = nameof(Jackpots);
}

public static class AppPermissions
{
    private static readonly AppPermission[] allPermissions =
   {
        //tenants
        new("View Tenants", AppAction.View, AppResource.Tenants, IsRoot: true),
        new("Create Tenants", AppAction.Create, AppResource.Tenants, IsRoot: true),
        new("Update Tenants", AppAction.Update, AppResource.Tenants, IsRoot: true),
        new("Upgrade Tenant Subscription", AppAction.UpgradeSubscription, AppResource.Tenants, IsRoot: true),

        //identity
        new("View Users", AppAction.View, AppResource.Users),
        new("Search Users", AppAction.Search, AppResource.Users),
        new("Create Users", AppAction.Create, AppResource.Users),
        new("Update Users", AppAction.Update, AppResource.Users),
        new("Delete Users", AppAction.Delete, AppResource.Users),
        new("Export Users", AppAction.Export, AppResource.Users),
        new("View UserRoles", AppAction.View, AppResource.UserRoles),
        new("Update UserRoles", AppAction.Update, AppResource.UserRoles),
        new("View Roles", AppAction.View, AppResource.Roles),
        new("Create Roles", AppAction.Create, AppResource.Roles),
        new("Update Roles", AppAction.Update, AppResource.Roles),
        new("Delete Roles", AppAction.Delete, AppResource.Roles),
        new("View RoleClaims", AppAction.View, AppResource.RoleClaims),
        new("Update RoleClaims", AppAction.Update, AppResource.RoleClaims),
        new("Search Transactions", AppAction.Search, AppResource.Transactions),
        new("Approve Transactions", AppAction.Update, AppResource.Transactions),
        new("Reject Transactions", AppAction.Update, AppResource.Transactions),
        new("Delete Transactions", AppAction.Delete, AppResource.Transactions),
        new("Request Transactions", AppAction.Request, AppResource.Transactions, IsBasic: true),
        new("View Transactions", AppAction.View, AppResource.Transactions, IsBasic: true),

        //play
        new("Play Dice", AppAction.Play, AppResource.Dice, IsBasic: true),

        //dice
        new("View Dice", AppAction.View, AppResource.Dice, IsBasic: true),
        new("Search Dice", AppAction.Search, AppResource.Dice, IsBasic: true),
        new("Create Dice", AppAction.Create, AppResource.Dice),
        new("Update Dice", AppAction.Update, AppResource.Dice),
        new("Delete Dice", AppAction.Delete, AppResource.Dice),
        new("Export Dice", AppAction.Export, AppResource.Dice),

        //jackpots
        new("View Jackpots", AppAction.View, AppResource.Jackpots, IsBasic: true),
        new("Search Jackpots", AppAction.Search, AppResource.Jackpots, IsBasic: true),
        new("Create Jackpots", AppAction.Create, AppResource.Jackpots),
        new("Update Jackpots", AppAction.Update, AppResource.Jackpots),
        new("Delete Jackpots", AppAction.Delete, AppResource.Jackpots),
        new("Export Jackpots", AppAction.Export, AppResource.Jackpots),

        new("View Hangfire", AppAction.View, AppResource.Hangfire),
        new("View Dashboard", AppAction.View, AppResource.Dashboard),
   };

    public static IReadOnlyList<AppPermission> All { get; } = new ReadOnlyCollection<AppPermission>(allPermissions);
    public static IReadOnlyList<AppPermission> Root { get; } = new ReadOnlyCollection<AppPermission>(allPermissions.Where(p => p.IsRoot).ToArray());
    public static IReadOnlyList<AppPermission> Admin { get; } = new ReadOnlyCollection<AppPermission>(allPermissions.Where(p => !p.IsRoot).ToArray());
    public static IReadOnlyList<AppPermission> Basic { get; } = new ReadOnlyCollection<AppPermission>(allPermissions.Where(p => p.IsBasic).ToArray());
}

public record AppPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsRoot = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource)
    {
        return $"Permissions.{resource}.{action}";
    }
}


