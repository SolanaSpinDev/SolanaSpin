﻿using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using SolanaSpin.Framework.Core.Domain.Contracts;
using SolanaSpin.Framework.Core.Persistence;
using Mapster;

namespace SolanaSpin.Framework.Infrastructure.Identity.Persistence;
internal sealed class IdentityRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T>
    where T : class, IAggregateRoot
{
    public IdentityRepository(IdentityDbContext context)
        : base(context)
    {
    }

    // We override the default behavior when mapping to a dto.
    // We're using Mapster's ProjectToType here to immediately map the result from the database.
    // This is only done when no Selector is defined, so regular specifications with a selector also still work.
    protected override IQueryable<TResult> ApplySpecification<TResult>(ISpecification<T, TResult> specification) =>
        specification.Selector is not null
            ? base.ApplySpecification(specification)
            : ApplySpecification(specification, false)
                .ProjectToType<TResult>();
}
