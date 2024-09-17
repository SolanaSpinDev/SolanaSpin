﻿using Finbuckle.MultiTenant;
using SolanaSpin.WebApi.Catalog.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SolanaSpin.WebApi.Catalog.Infrastructure.Persistence.Configurations;
internal sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.IsMultiTenant();
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(100);
        builder.Property(x => x.Description).HasMaxLength(1000);
    }
}
