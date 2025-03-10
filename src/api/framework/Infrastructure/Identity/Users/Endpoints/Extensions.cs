﻿using Microsoft.AspNetCore.Routing;

namespace SolanaSpin.Framework.Infrastructure.Identity.Users.Endpoints;
internal static class Extensions
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapRegisterUserEndpoint();
        app.MapSelfRegisterUserEndpoint();
        app.MapUpdateUserEndpoint();
        app.MapGetUsersListEndpoint();
        app.MapDeleteUserEndpoint();
        app.MapForgotPasswordEndpoint();
        app.MapChangePasswordEndpoint();
        app.MapResetPasswordEndpoint();
        app.MapGetMeEndpoint();
        app.MapGetUserEndpoint();
        app.MapGetCurrentUserPermissionsEndpoint();
        app.ToggleUserStatusEndpointEndpoint();
        app.MapAssignRolesToUserEndpoint();
        app.MapGetUserRolesEndpoint();
        app.MapUpdateBalanceEndpoint();
        app.MapRefreshBalanceEndpoint();
        return app;
    }
}
