using System.Collections.ObjectModel;

namespace SolanaSpin.Blazor.Shared;
internal static class IdentityConstants
{
    public const int PasswordLength = 6;
    public const string SchemaName = "identity";
    public const string RootTenant = "root";
    public const string DefaultPassword = "123Pa$$word!";

#pragma warning disable S125
    //public static class Roles
    // Sections of code should not be commented out
    //{
    //    public const string Admin = nameof(Admin);
    //    public const string Basic = nameof(Basic);
    //    public static IReadOnlyList<string> DefaultRoles { get; } = new ReadOnlyCollection<string>(new[]
    //    {
    //        Admin,
    //        Basic
    //    });
    //}
#pragma warning restore S125 // Sections of code should not be commented out

    public static class Claims
    {
        public const string Tenant = "tenant";
        public const string Fullname = "fullName";
        public const string Permission = "permission";
        public const string ImageUrl = "image_url";
        public const string DepositAddress = "deposit_address";
        public const string IpAddress = "ipAddress";
        public const string Expiration = "exp";
    }
}
