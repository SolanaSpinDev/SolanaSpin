using Carter;
using SolanaSpin.Framework.Core.Persistence;
using SolanaSpin.Framework.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using SolanaSpin.WebApi.Playground.Domain;
using SolanaSpin.WebApi.Playground.Features.CreateDice;
using SolanaSpin.WebApi.Playground.Features.CreateJackpot;
using SolanaSpin.WebApi.Playground.Features.DeleteDice;
using SolanaSpin.WebApi.Playground.Features.DeleteJackpot;
using SolanaSpin.WebApi.Playground.Features.GetDice;
using SolanaSpin.WebApi.Playground.Features.GetDiceList;
using SolanaSpin.WebApi.Playground.Features.GetJackpot;
using SolanaSpin.WebApi.Playground.Features.GetJackpotList;
using SolanaSpin.WebApi.Playground.Features.PlayDice;
using SolanaSpin.WebApi.Playground.Features.UpdateDice;
using SolanaSpin.WebApi.Playground.Features.UpdateJackpot;
using SolanaSpin.WebApi.Playground.Persistence;

namespace SolanaSpin.WebApi.Playground;
public static class PlaygroundModule
{

    public class Endpoints : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            var playGroup = app.MapGroup("play").WithTags("play");
            playGroup.MapPlayDiceEndpoint();

            var diceGroup = app.MapGroup("dice").WithTags("dice");
            diceGroup.MapCreateDiceEndpoint();
            diceGroup.MapGetDiceEndpoint();
            diceGroup.MapGetDiceListEndpoint();
            diceGroup.MapUpdateDiceEndpoint();
            diceGroup.MapDeleteDiceEndpoint();

            var jackpotGroup = app.MapGroup("jackpot").WithTags("jackpot");
            jackpotGroup.MapCreateJackpotEndpoint();
            jackpotGroup.MapGetJackpotEndpoint();
            jackpotGroup.MapGetJackpotListEndpoint();
            jackpotGroup.MapUpdateJackpotEndpoint();
            jackpotGroup.MapDeleteJackpotEndpoint();
        }
    }
    public static WebApplicationBuilder RegisterPlaygroundServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);
        builder.Services.BindDbContext<PlaygroundDbContext>();
        builder.Services.AddScoped<IDbInitializer, PlaygroundDbInitializer>();
        builder.Services.AddKeyedScoped<IRepository<Dice>, PlaygroundRepository<Dice>>("playground:dice");
        builder.Services.AddKeyedScoped<IReadRepository<Dice>, PlaygroundRepository<Dice>>("playground:dice");
        builder.Services.AddKeyedScoped<IRepository<Jackpot>, PlaygroundRepository<Jackpot>>("playground:jackpot");
        builder.Services.AddKeyedScoped<IReadRepository<Jackpot>, PlaygroundRepository<Jackpot>>("playground:jackpot");
        return builder;
    }
    public static WebApplication UsePlaygroundModule(this WebApplication app)
    {
        return app;
    }
}
