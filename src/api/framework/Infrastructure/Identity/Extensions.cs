using SolanaSpin.Framework.Core.Identity.Roles;
using SolanaSpin.Framework.Core.Identity.Tokens;
using SolanaSpin.Framework.Core.Identity.Users.Abstractions;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Auth;
using SolanaSpin.Framework.Infrastructure.Identity.Persistence;
using SolanaSpin.Framework.Infrastructure.Identity.Roles;
using SolanaSpin.Framework.Infrastructure.Identity.Roles.Endpoints;
using SolanaSpin.Framework.Infrastructure.Identity.Social.Endpoints;
using SolanaSpin.Framework.Infrastructure.Identity.Tokens;
using SolanaSpin.Framework.Infrastructure.Identity.Tokens.Endpoints;
using SolanaSpin.Framework.Infrastructure.Identity.Users;
using SolanaSpin.Framework.Infrastructure.Identity.Users.Endpoints;
using SolanaSpin.Framework.Infrastructure.Identity.Users.Services;
using SolanaSpin.Framework.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace SolanaSpin.Framework.Infrastructure.Identity;
internal static class Extensions
{
    internal static IServiceCollection ConfigureIdentity(this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);
        services.AddScoped<CurrentUserMiddleware>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped(sp => (ICurrentUserInitializer)sp.GetRequiredService<ICurrentUser>());
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IRoleService, RoleService>();
        services.BindDbContext<IdentityDbContext>();
        services.AddScoped<IDbInitializer, IdentityDbInitializer>();
        services.AddIdentity<AppUser, AppRole>(options =>
           {
               options.Password.RequiredLength = IdentityConstants.PasswordLength;
               options.Password.RequireDigit = false;
               options.Password.RequireLowercase = false;
               options.Password.RequireNonAlphanumeric = false;
               options.Password.RequireUppercase = false;
               options.User.RequireUniqueEmail = true;
           })
           .AddEntityFrameworkStores<IdentityDbContext>()
           .AddDefaultTokenProviders();
        return services;
    }

    public static IEndpointRouteBuilder MapIdentityEndpoints(this IEndpointRouteBuilder app)
    {
        var users = app.MapGroup("api/users").WithTags("users");
        users.MapUserEndpoints();

        var social = app.MapGroup("api/social").WithTags("social");
        social.MapSocialEndpoints();

        var tokens = app.MapGroup("api/token").WithTags("token");
        tokens.MapTokenEndpoints();

        var roles = app.MapGroup("api/roles").WithTags("roles");
        roles.MapRoleEndpoints();
        return app;
    }
}
