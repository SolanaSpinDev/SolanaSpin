﻿using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Persistence.Interceptors;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Serilog;

namespace SolanaSpin.Framework.Infrastructure.Persistence;
public static class Extensions
{
    internal static DbContextOptionsBuilder ConfigureDatabase(this DbContextOptionsBuilder builder, string dbProvider, string connectionString)
    {
        return dbProvider.ToUpperInvariant() switch
        {
            DbProviders.PostgreSQL => builder.UseNpgsql(connectionString, e =>
                                 e.MigrationsAssembly("SolanaSpin.WebApi.Migrations.PostgreSQL")).EnableSensitiveDataLogging(),
            DbProviders.MSSQL => builder.UseSqlServer(connectionString, e =>
                                e.MigrationsAssembly("SolanaSpin.WebApi.Migrations.MSSQL")),
            _ => throw new InvalidOperationException($"DB Provider {dbProvider} is not supported."),
        };
    }

    public static WebApplicationBuilder ConfigureDatabase(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
        builder.Services.AddOptions<DatabaseOptions>()
            .BindConfiguration(nameof(DatabaseOptions))
            .ValidateDataAnnotations();
        builder.Services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        return builder;
    }

    public static IServiceCollection BindDbContext<TContext>(this IServiceCollection services)
        where TContext : DbContext
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddDbContext<TContext>((sp, options) =>
        {
            var dbConfig = sp.GetRequiredService<IOptions<DatabaseOptions>>().Value;
            options.ConfigureDatabase(dbConfig.Provider, dbConfig.ConnectionString);
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
        });
        return services;
    }
}
