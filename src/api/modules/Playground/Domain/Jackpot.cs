using SolanaSpin.Framework.Core.Domain;
using SolanaSpin.Framework.Core.Domain.Contracts;
using SolanaSpin.WebApi.Playground.Domain.Events;
using SolanaSpin.WebApi.Playground.Features.CreateJackpot;
using SolanaSpin.WebApi.Playground.Features.UpdateJackpot;

namespace SolanaSpin.WebApi.Playground.Domain;
public class JackpotDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsEnabled { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal LimitAmount { get; set; }
    public decimal CollectPercentage { get; set; }
    public decimal? MaximumPlayAmountToWin { get; set; }
    public decimal? MinimumPlayAmountToWin { get; set; }
}
public class Jackpot : AuditableEntity, IAggregateRoot
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public bool IsEnabled { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal LimitAmount { get; set; }
    public decimal CollectPercentage { get; set; }
    public decimal? MinimumPlayAmountToWin { get; set; }
    public decimal? MaximumPlayAmountToWin { get; set; }

    public static Jackpot Create(CreateJackpotCommand request)
    {
        var item = new Jackpot
        {
            Title = request.Title,
            Slug = request.Slug,
            IsEnabled = request.IsEnabled,
            CurrentAmount = 0,
            LimitAmount = request.LimitAmount,
            CollectPercentage = request.CollectPercentage,
            MinimumPlayAmountToWin = request.MinimumPlayAmountToWin,
            MaximumPlayAmountToWin = request.MaximumPlayAmountToWin,
        };
        item.QueueDomainEvent(new JackpotCreated(item));
        return item;
    }

    public Jackpot Update(UpdateJackpotCommand request)
    {
        if (request.Title is not null && Title?.Equals(request.Title, StringComparison.OrdinalIgnoreCase) is not true) Title = request.Title;
        if (request.Slug is not null && Slug?.Equals(request.Slug, StringComparison.OrdinalIgnoreCase) is not true) Slug = request.Slug;
        if (request.IsEnabled.HasValue && !IsEnabled.Equals(request.IsEnabled.Value)) IsEnabled = request.IsEnabled.Value;
        if (request.LimitAmount.HasValue && !LimitAmount.Equals(request.LimitAmount.Value)) LimitAmount = request.LimitAmount.Value;
        if (request.CollectPercentage.HasValue && !CollectPercentage.Equals(request.CollectPercentage.Value)) CollectPercentage = request.CollectPercentage.Value;
        if (request.MinimumPlayAmountToWin.HasValue && !MinimumPlayAmountToWin.Equals(request.MinimumPlayAmountToWin.Value)) MinimumPlayAmountToWin = request.MinimumPlayAmountToWin.Value;
        if (request.ResetMinimumPlayAmountToWin) MinimumPlayAmountToWin = null;
        if (request.MaximumPlayAmountToWin.HasValue && !MaximumPlayAmountToWin.Equals(request.MaximumPlayAmountToWin.Value)) MaximumPlayAmountToWin = request.MaximumPlayAmountToWin.Value;
        if (request.ResetMaximumPlayAmountToWin) MaximumPlayAmountToWin = null;
        QueueDomainEvent(new JackpotUpdated(this));
        return this;
    }
}
