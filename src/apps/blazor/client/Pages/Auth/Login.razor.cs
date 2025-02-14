﻿using SolanaSpin.Blazor.Client.Components;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using MudBlazor;

namespace SolanaSpin.Blazor.Client.Pages.Auth;

public partial class Login()
{
    [CascadingParameter]
    public Task<AuthenticationState> AuthState { get; set; } = default!;

    private AppValidation? _customValidation;

    public bool BusySubmitting { get; set; }

    private readonly GenerateTokenCommand _tokenRequest = new();
    private string TenantId { get; set; } = "root";
    private bool _passwordVisibility;
    private InputType _passwordInput = InputType.Password;
    private string _passwordInputIcon = Icons.Material.Filled.VisibilityOff;

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthState;
        if (authState.User.Identity?.IsAuthenticated is true)
        {
            Navigation.NavigateTo("/admin/dashboard");
        }
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

    private void FillAdministratorCredentials()
    {
        _tokenRequest.Email = TenantConstants.Root.EmailAddress;
        _tokenRequest.Password = TenantConstants.DefaultPassword;
        TenantId = TenantConstants.Root.Id;
    }

    private async Task SubmitAsync()
    {
        BusySubmitting = true;

        if (await ApiHelper.ExecuteCallGuardedAsync(
            () => authService.LoginAsync(TenantId, _tokenRequest),
            Toast,
            _customValidation))
        {
            Toast.Add($"Logged in as {_tokenRequest.Email}", Severity.Info);
        }

        BusySubmitting = false;
    }

    private void RedirectToGoogleLogin()
    {
        authService.NavigateToExternalLogin(TenantId, "Google");
    }

    private void RedirectToFacebookLogin()
    {
        authService.NavigateToExternalLogin(TenantId, "Facebook");
    }

    private void RedirectToMicrosoftLogin()
    {
        authService.NavigateToExternalLogin(TenantId, "Microsoft");
    }

    private void RedirectToTwitterLogin()
    {
        authService.NavigateToExternalLogin(TenantId, "Twitter");
    }
}
