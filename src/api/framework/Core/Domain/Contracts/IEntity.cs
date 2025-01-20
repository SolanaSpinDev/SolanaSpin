using System.Collections.ObjectModel;
using SolanaSpin.Framework.Core.Domain.Events;

namespace SolanaSpin.Framework.Core.Domain.Contracts;

public interface IEntity
{
    Collection<DomainEvent> DomainEvents { get; }
}

public interface IEntity<out TId> : IEntity
{
    TId Id { get; }
}
