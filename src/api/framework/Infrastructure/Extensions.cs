using System.Reflection;
using Asp.Versioning.Conventions;
using FluentValidation;
using SolanaSpin.Framework.Core;
using SolanaSpin.Framework.Core.Origin;
using SolanaSpin.Framework.Infrastructure.Auth;
using SolanaSpin.Framework.Infrastructure.Auth.Jwt;
using SolanaSpin.Framework.Infrastructure.Behaviours;
using SolanaSpin.Framework.Infrastructure.Caching;
using SolanaSpin.Framework.Infrastructure.Cors;
using SolanaSpin.Framework.Infrastructure.Exceptions;
using SolanaSpin.Framework.Infrastructure.Identity;
using SolanaSpin.Framework.Infrastructure.Jobs;
using SolanaSpin.Framework.Infrastructure.Logging.Serilog;
using SolanaSpin.Framework.Infrastructure.Mail;
using SolanaSpin.Framework.Infrastructure.OpenApi;
using SolanaSpin.Framework.Infrastructure.Persistence;
using SolanaSpin.Framework.Infrastructure.RateLimit;
using SolanaSpin.Framework.Infrastructure.SecurityHeaders;
using SolanaSpin.Framework.Infrastructure.Storage.Files;
using SolanaSpin.Framework.Infrastructure.Tenant;
using SolanaSpin.Framework.Infrastructure.Tenant.Endpoints;
using SolanaSpin.Aspire.ServiceDefaults;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using SolanaSpin.Framework.Infrastructure.Auth.Social;
using SolanaSpin.Framework.Infrastructure.Blockchain;

namespace SolanaSpin.Framework.Infrastructure;

public static class Extensions
{
    public static WebApplicationBuilder ConfigureAppFramework(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
        builder.AddServiceDefaults();
        builder.ConfigureSerilog();
        builder.ConfigureDatabase();
        builder.Services.ConfigureMultitenancy();
        builder.Services.ConfigureIdentity();
        builder.Services.AddBlockchain(builder.Configuration);
        builder.Services.AddCorsPolicy(builder.Configuration);
        builder.Services.ConfigureFileStorage();
        builder.Services.ConfigureJwtAuth()
            .AddSocialAuth(builder.Configuration);
        builder.Services.ConfigureOpenApi();
        builder.Services.ConfigureJobs(builder.Configuration);
        builder.Services.ConfigureMailing();
        builder.Services.ConfigureCaching(builder.Configuration);
        builder.Services.AddExceptionHandler<CustomExceptionHandler>();
        builder.Services.AddProblemDetails();

        builder.Services.AddHealthChecks();
        builder.Services.AddOptions<OriginOptions>().BindConfiguration(nameof(OriginOptions));

        // Define module assemblies
        var assemblies = new Assembly[]
        {
            typeof(AppCore).Assembly
        };

        // Register validators
        builder.Services.AddValidatorsFromAssemblies(assemblies);

        // Register MediatR
        builder.Services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblies(assemblies);
            cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        });

        builder.Services.ConfigureRateLimit(builder.Configuration);
        builder.Services.ConfigureSecurityHeaders(builder.Configuration);

        return builder;
    }

    public static WebApplication UseAppFramework(this WebApplication app)
    {
        app.MapDefaultEndpoints();
        app.UseRateLimit();
        app.UseSecurityHeaders();
        app.UseMultitenancy();
        app.UseExceptionHandler();
        app.UseCorsPolicy();
        app.UseOpenApi();
        app.UseJobDashboard(app.Configuration);
        app.UseRouting();
        app.UseStaticFiles();
        app.UseStaticFiles(new StaticFileOptions()
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "assets")),
            RequestPath = new PathString("/assets")
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapTenantEndpoints();
        app.MapIdentityEndpoints();

        // Current user middleware
        app.UseMiddleware<CurrentUserMiddleware>();

        // Register API versions
        var versions = app.NewApiVersionSet()
                    .HasApiVersion(1)
                    .HasApiVersion(2)
                    .ReportApiVersions()
                    .Build();

        // Map versioned endpoint
        app.MapGroup("api/v{version:apiVersion}").WithApiVersionSet(versions);

        return app;
    }
}
