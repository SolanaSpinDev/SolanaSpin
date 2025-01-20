using FSH.Framework.Core.Blockchain;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FSH.Framework.Infrastructure.Blockchain;
public static class Extensions
{
    internal static IServiceCollection AddBlockchain(this IServiceCollection services, IConfiguration config)
    {
        return services.AddScoped<IBlockchainService, BlockchainService>();
    }

    internal static IApplicationBuilder UseBlockchain(this IApplicationBuilder app)
    {
        return app;
    }
}
