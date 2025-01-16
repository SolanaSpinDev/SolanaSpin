using Microsoft.AspNetCore.Components;
using MudBlazor;
using SolanaSpin.Blazor.Infrastructure.Api;

namespace SolanaSpin.Blazor.Client.Components;

public static class ApiHelper
{
    public static async Task<T?> ExecuteCallGuardedAsync<T>(
        Func<Task<T>> call,
        ISnackbar snackbar,
        NavigationManager navigationManager,
        FshValidation? customValidation = null,
        string? successMessage = null)
    {
        customValidation?.ClearErrors();
        try
        {
            var result = await call();

            if (!string.IsNullOrWhiteSpace(successMessage))
            {
                _ = snackbar.Add(successMessage, Severity.Info);
            }

            return result;
        }
        catch (ApiException ex)
        {
            if (ex.StatusCode == 401)
            {
                navigationManager.NavigateTo("/admin/logout");
            }
            else if (ex.StatusCode == 400)
            {
            }
            else
            {
                var message = ex.Message switch
                {
                    "TypeError: Failed to fetch" => "Unable to Reach API",
                    _ => ex.Message
                };
                _ = snackbar.Add(message, Severity.Error);
            }
        }

        return default;
    }

    public static async Task<bool> ExecuteCallGuardedAsync(
        Func<Task> call,
        ISnackbar snackbar,
        FshValidation? customValidation = null,
        string? successMessage = null)
    {
        customValidation?.ClearErrors();
        try
        {
            await call();

            if (!string.IsNullOrWhiteSpace(successMessage))
            {
                _ = snackbar.Add(successMessage, Severity.Success);
            }

            return true;
        }
        catch (ApiException ex)
        {
            _ = snackbar.Add(ex.Message, Severity.Error);
        }

        return false;
    }
}
