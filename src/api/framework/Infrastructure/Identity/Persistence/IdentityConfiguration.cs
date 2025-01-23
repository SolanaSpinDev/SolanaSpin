using Finbuckle.MultiTenant;
using SolanaSpin.Framework.Infrastructure.Identity.RoleClaims;
using SolanaSpin.Framework.Infrastructure.Identity.Roles;
using SolanaSpin.Framework.Infrastructure.Identity.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SolanaSpin.Framework.Infrastructure.Identity.Transactions;

namespace SolanaSpin.Framework.Infrastructure.Identity.Persistence;

public class ApplicationUserConfig : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder
            .ToTable("Users", IdentityConstants.SchemaName)
            .IsMultiTenant();

        builder
            .Property(u => u.ObjectId)
                .HasMaxLength(256);
    }
}

public class ApplicationRoleConfig : IEntityTypeConfiguration<AppRole>
{
    public void Configure(EntityTypeBuilder<AppRole> builder) =>
        builder
            .ToTable("Roles", IdentityConstants.SchemaName)
            .IsMultiTenant()
                .AdjustUniqueIndexes();
}

public class ApplicationRoleClaimConfig : IEntityTypeConfiguration<AppRoleClaim>
{
    public void Configure(EntityTypeBuilder<AppRoleClaim> builder) =>
        builder
            .ToTable("RoleClaims", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserRoleConfig : IEntityTypeConfiguration<IdentityUserRole<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder) =>
        builder
            .ToTable("UserRoles", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserClaimConfig : IEntityTypeConfiguration<IdentityUserClaim<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> builder) =>
        builder
            .ToTable("UserClaims", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserLoginConfig : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> builder) =>
        builder
            .ToTable("UserLogins", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserTokenConfig : IEntityTypeConfiguration<IdentityUserToken<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder) =>
        builder
            .ToTable("UserTokens", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class TransactionConfig : IEntityTypeConfiguration<AppTransaction>
{
    public void Configure(EntityTypeBuilder<AppTransaction> builder)
    {
        builder
            .ToTable("Transactions", IdentityConstants.SchemaName)
            .IsMultiTenant();
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
