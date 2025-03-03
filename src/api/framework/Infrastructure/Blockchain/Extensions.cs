using SolanaSpin.Framework.Core.Blockchain;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SolanaSpin.Framework.Infrastructure.Blockchain;
public static class Extensions
{
    internal static IServiceCollection AddBlockchain(this IServiceCollection services, IConfiguration config)
    {
        return services
            .AddScoped<IBlockchainService, BlockchainService>()
            .AddScoped<IWalletService, WalletService>();
    }

    internal static IApplicationBuilder UseBlockchain(this IApplicationBuilder app)
    {
        return app;
    }
}
