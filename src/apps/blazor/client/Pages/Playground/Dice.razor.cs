using SolanaSpin.Blazor.Client.Components.EntityTable;
using SolanaSpin.Blazor.Infrastructure.Api;
using SolanaSpin.WebApi.Shared.Authorization;
using Mapster;
using Microsoft.AspNetCore.Components;

namespace SolanaSpin.Blazor.Client.Pages.Playground;

public partial class Dice
{
    [Inject]
    protected IApiClient ApiClient { get; set; } = default!;

    protected EntityServerTableContext<DiceDto, Guid, UpdateDiceCommand> Context { get; set; } = default!;

    private EntityTable<DiceDto, Guid, UpdateDiceCommand> _table = default!;

    protected override void OnInitialized()
    {
        Context = new(
            entityName: "Wheel",
            entityNamePlural: "Wheels",
            entityResource: FshResource.Dice,
            fields: [
                new(item => item.Id, "Wheel Id"),
                new(item => item.Title, "Title"),
                new(item => item.Slug, "Slug"),
                new(item => item.IsPubliclyPlayable, "Public", Type: typeof(bool)),
                new(item => item.MinimumPlayAmount, "Min Amount"),
                new(item => item.MaximumPlayAmount, "Max Amount"),
                new(item => $"{item.Faces?.Count ?? 0} outcomes", "Outcome Count"),
            ],
            enableAdvancedSearch: false,
            idFunc: item => item.Id,
            searchFunc: async filter =>
            {
                var paginationFilter = filter.Adapt<PaginationFilter>();
                var result = await ApiClient.GetDiceListEndpointAsync("1", paginationFilter);
                return result.Adapt<PaginationResponse<DiceDto>>();
            },
            editFormInitializedFunc: item =>
            {
                item.IsPubliclyPlayable ??= false;
                item.Faces ??= [];
                return Task.CompletedTask;
            },
            createFunc: async item => await ApiClient.CreateDiceEndpointAsync("1", item.Adapt<CreateDiceCommand>()),
            updateFunc: async (id, item) => await ApiClient.UpdateDiceEndpointAsync("1", id, item.Adapt<UpdateDiceCommand>()),
            deleteFunc: async id => await ApiClient.DeleteDiceEndpointAsync("1", id));
    }
}
