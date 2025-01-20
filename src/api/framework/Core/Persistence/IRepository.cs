﻿using Ardalis.Specification;
using SolanaSpin.Framework.Core.Domain.Contracts;

namespace SolanaSpin.Framework.Core.Persistence;
public interface IRepository<T> : IRepositoryBase<T>
    where T : class, IAggregateRoot
{
}

public interface IReadRepository<T> : IReadRepositoryBase<T>
    where T : class, IAggregateRoot
{
}
