using SolanaSpin.Blazor.Client.Components.EntityTable;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.WebApi.Shared.Authorization;
using Mapster;
using Microsoft.AspNetCore.Components;

namespace SolanaSpin.Blazor.Client.Pages.Playground;

public partial class Jackpots
{
    [Inject]
    protected IApiClient ApiClient { get; set; } = default!;

    protected EntityServerTableContext<JackpotDto, Guid, UpdateJackpotCommand> Context { get; set; } = default!;

    private EntityTable<JackpotDto, Guid, UpdateJackpotCommand> _table = default!;

    protected override void OnInitialized()
    {
        Context = new(
            entityName: "Jackpot",
            entityNamePlural: "Jackpots",
            entityResource: AppResource.Jackpots,
            fields: [
                new(item => item.Id, "Jackpot Id"),
                new(item => item.Title, "Title"),
                new(item => item.Slug, "Slug"),
                new(item => item.IsEnabled, "Enabled"),
                new(item => item.CurrentAmount, "Current Amount"),
                new(item => item.LimitAmount, "Limit Amount"),
                new(item => item.CollectPercentage, "Collect %"),
                new(item => item.MinimumPlayAmountToWin, "Min Play Amount (to win)"),
                new(item => item.MaximumPlayAmountToWin, "Max Play Amount (to win)"),
            ],
            enableAdvancedSearch: false,
            idFunc: item => item.Id,
            searchFunc: async filter =>
            {
                var paginationFilter = filter.Adapt<PaginationFilter>();
                var result = await ApiClient.GetJackpotListEndpointAsync("1", paginationFilter);
                return result.Adapt<PaginationResponse<JackpotDto>>();
            },
            editFormInitializedFunc: item =>
            {
                item.IsEnabled ??= false;
                return Task.CompletedTask;
            },
            createFunc: async item => await ApiClient.CreateJackpotEndpointAsync("1", item.Adapt<CreateJackpotCommand>()),
            updateFunc: async (id, item) => await ApiClient.UpdateJackpotEndpointAsync("1", id, item.Adapt<UpdateJackpotCommand>()),
            deleteFunc: async id => await ApiClient.DeleteJackpotEndpointAsync("1", id));
    }
}
