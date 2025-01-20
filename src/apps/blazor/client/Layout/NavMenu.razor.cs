using SolanaSpin.Blazor.Infrastructure.Auth;
using SolanaSpin.WebApi.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;

namespace SolanaSpin.Blazor.Client.Layout;

public partial class NavMenu
{
    [CascadingParameter]
    protected Task<AuthenticationState> AuthState { get; set; } = default!;
    [Inject]
    protected IAuthorizationService AuthService { get; set; } = default!;

    private bool _canViewHangfire;
    private bool _canViewDashboard;
    private bool _canViewRoles;
    private bool _canViewUsers;
    private bool _canViewDice;
    private bool _canViewTenants;
    private bool CanViewAdministrationGroup => _canViewUsers || _canViewRoles || _canViewTenants;

    protected override async Task OnParametersSetAsync()
    {
        var user = (await AuthState).User;
        _canViewHangfire = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Hangfire);
        _canViewDashboard = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Dashboard);
        _canViewRoles = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Roles);
        _canViewUsers = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Users);
        _canViewDice = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Dice);
        _canViewTenants = await AuthService.HasPermissionAsync(user, AppAction.View, AppResource.Tenants);
    }
}
