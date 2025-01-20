using SolanaSpin.Blazor.Client.Components.EntityTable;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.Blazor.Infrastructure.Auth;
using SolanaSpin.WebApi.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using MudBlazor;
using SolanaSpin.Blazor.Client.Components;

namespace SolanaSpin.Blazor.Client.Pages.Identity.Users;

public partial class Users
{
    [CascadingParameter]
    protected Task<AuthenticationState> AuthState { get; set; } = default!;
    [Inject]
    protected IAuthorizationService AuthService { get; set; } = default!;

    [Inject]
    protected IApiClient UsersClient { get; set; } = default!;

    public EntityTable<UserDetail, Guid, RegisterUserCommand> EntityTable { get; set; } = default!;


    protected EntityClientTableContext<UserDetail, Guid, RegisterUserCommand> Context { get; set; } = default!;

    private bool _canExportUsers;
    private bool _canUpdateUsers;
    private bool _canDeleteUsers;
    private bool _canViewRoles;

    // Fields for editform
    protected string Password { get; set; } = string.Empty;
    protected string ConfirmPassword { get; set; } = string.Empty;

    private bool _passwordVisibility;
    private InputType _passwordInput = InputType.Password;
    private string _passwordInputIcon = Icons.Material.Filled.VisibilityOff;

    protected override async Task OnInitializedAsync()
    {
        var user = (await AuthState).User;
        _canExportUsers = await AuthService.HasPermissionAsync(user, FshAction.Export, FshResource.Users);
        _canUpdateUsers = await AuthService.HasPermissionAsync(user, FshAction.Update, FshResource.Users);
        _canDeleteUsers = await AuthService.HasPermissionAsync(user, FshAction.Delete, FshResource.Users);
        _canViewRoles = await AuthService.HasPermissionAsync(user, FshAction.View, FshResource.UserRoles);

        Context = new(
            entityName: "User",
            entityNamePlural: "Users",
            entityResource: FshResource.Users,
            searchAction: FshAction.View,
            updateAction: string.Empty,
            deleteAction: string.Empty,
            fields: new()
            {
                new(user => user.FirstName,"First Name"),
                new(user => user.LastName, "Last Name"),
                new(user => user.UserName, "User Name"),
                new(user => user.Email, "Email"),
                new(user => user.PhoneNumber, "Phone Number"),
                new(user => user.EmailConfirmed, "Email Confirmation", Type: typeof(bool)),
                new(user => user.IsActive, "Active", Type: typeof(bool)),
                new(user => user.Balance, "Balance", Type: typeof(decimal)),
                new(user => user.DepositAddress, "Deposit Address", Type: typeof(decimal))
            },
            idFunc: user => user.Id,
            loadDataFunc: async () => (await UsersClient.GetUsersListEndpointAsync()).ToList(),
            searchFunc: (searchString, user) =>
                string.IsNullOrWhiteSpace(searchString)
                    || user.FirstName?.Contains(searchString, StringComparison.OrdinalIgnoreCase) == true
                    || user.LastName?.Contains(searchString, StringComparison.OrdinalIgnoreCase) == true
                    || user.Email?.Contains(searchString, StringComparison.OrdinalIgnoreCase) == true
                    || user.PhoneNumber?.Contains(searchString, StringComparison.OrdinalIgnoreCase) == true
                    || user.UserName?.Contains(searchString, StringComparison.OrdinalIgnoreCase) == true,
            createFunc: user => UsersClient.RegisterUserEndpointAsync(user),
            hasExtraActionsFunc: () => true,
            exportAction: string.Empty);
    }

    private void ViewProfile(in Guid userId) =>
        Navigation.NavigateTo($"/admin/users/{userId}/profile");

    private void ManageRoles(in Guid userId) =>
        Navigation.NavigateTo($"/admin/users/{userId}/roles");

    private async Task UpdateBalanceAsync(Guid userId, double delta)
    {
        await ApiHelper.ExecuteCallGuardedAsync(
            () => UsersClient.UpdateBalanceEndpointAsync(userId.ToString(), delta),
            Toast, Navigation,
            null,
            "Balance Updated.");
        await EntityTable.ReloadDataAsync();
    }

    private async Task RefreshBalanceAsync(Guid userId)
    {
        await ApiHelper.ExecuteCallGuardedAsync(
            () => UsersClient.RefreshBalanceEndpointAsync(userId.ToString()),
            Toast, Navigation,
            null,
            "Balance Refreshed.");
        await EntityTable.ReloadDataAsync();
    }

    private async Task<bool> DeleteUserAsync(string userId)
    {
        await UsersClient.DeleteUserEndpointAsync(userId);
        return true;
    }

    private async Task DeleteUserAsync(Guid userId)
    {
        await ApiHelper.ExecuteCallGuardedAsync(
            () => DeleteUserAsync(userId.ToString()),
            Toast, Navigation,
            null,
            "User Deleted.");
        await EntityTable.ReloadDataAsync();
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

        Context.AddEditModal.ForceRender();
    }
}
