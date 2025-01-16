using SolanaSpin.Blazor.Client.Components;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Shared;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace SolanaSpin.Blazor.Client.Pages.Auth;

public partial class SelfRegister
{
    private readonly RegisterUserCommand _createUserRequest = new();
    private FshValidation? _customValidation;
    private bool BusySubmitting { get; set; }

    [Inject]
    private IApiClient UsersClient { get; set; } = default!;

    private string Tenant { get; set; } = TenantConstants.Root.Id;

    private bool _passwordVisibility;
    private InputType _passwordInput = InputType.Password;
    private string _passwordInputIcon = Icons.Material.Filled.VisibilityOff;

    private async Task SubmitAsync()
    {
        BusySubmitting = true;

        var response = await ApiHelper.ExecuteCallGuardedAsync(
            () => UsersClient.SelfRegisterUserEndpointAsync(Tenant, _createUserRequest),
            Toast, Navigation,
            _customValidation);

        if (response != null)
        {
            Toast.Add($"user {_createUserRequest.Email} registered.", Severity.Success);
            Navigation.NavigateTo("/admin/login");
        }

        BusySubmitting = false;
    }

    private void TogglePasswordVisibility()
    {
        if (_passwordVisibility)
        {
            _passwordVisibility = false;
            _passwordInputIcon = Icons.Material.Filled.VisibilityOff;
            _passwordInput = InputType.Password;
        }
        else
        {
            _passwordVisibility = true;
            _passwordInputIcon = Icons.Material.Filled.Visibility;
            _passwordInput = InputType.Text;
        }
    }
}
