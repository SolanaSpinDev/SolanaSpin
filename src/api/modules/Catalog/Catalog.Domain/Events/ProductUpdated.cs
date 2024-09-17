using FSH.Framework.Core.Domain.Events;

namespace SolanaSpin.WebApi.Catalog.Domain.Events;
public sealed record ProductUpdated : DomainEvent
{
    public Product? Product { get; set; }
}
