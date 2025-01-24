using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using MudBlazor;
using SolanaSpin.Blazor.Client.Components;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Infrastructure.Auth;

namespace SolanaSpin.Blazor.Client.Pages.Dashboard;

public partial class Dashboard
{
    [CascadingParameter]
    protected Task<AuthenticationState> AuthState { get; set; } = default!;
    [Inject]
    protected IAuthenticationService AuthService { get; set; } = default!;
    [Inject]
    protected IApiClient PersonalClient { get; set; } = default!;
    [Inject]
    private NavigationManager NavigationManager { get; set; } = default!;


    private UserDto? _profile;

    protected override async Task OnInitializedAsync()
    {
        _profile = await ApiHelper.ExecuteCallGuardedAsync(
            () => PersonalClient.GetMeEndpointAsync(), Toast, NavigationManager);
    }

    private async Task RefreshProfileAsync()
    {
        _profile = await ApiHelper.ExecuteCallGuardedAsync(
            () => PersonalClient.GetMeEndpointAsync(), Toast, NavigationManager);
        _ = Toast.Add("Your Profile has been refreshed.", Severity.Success);
    }
}
