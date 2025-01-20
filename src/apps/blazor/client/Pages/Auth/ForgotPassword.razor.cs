using SolanaSpin.Blazor.Client.Components;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Shared;
using Microsoft.AspNetCore.Components;

namespace SolanaSpin.Blazor.Client.Pages.Auth;

public partial class ForgotPassword
{
    private readonly ForgotPasswordCommand _forgotPasswordRequest = new();
    private AppValidation? _customValidation;
    private bool BusySubmitting { get; set; }

    [Inject]
    private IApiClient UsersClient { get; set; } = default!;

    private string Tenant { get; set; } = TenantConstants.Root.Id;

    private async Task SubmitAsync()
    {
        BusySubmitting = true;

        await ApiHelper.ExecuteCallGuardedAsync(
            () => UsersClient.ForgotPasswordEndpointAsync(Tenant, _forgotPasswordRequest),
            Toast,
            _customValidation);

        BusySubmitting = false;
    }
}
