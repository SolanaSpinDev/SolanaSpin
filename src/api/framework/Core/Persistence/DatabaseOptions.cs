using System.ComponentModel.DataAnnotations;

namespace SolanaSpin.Framework.Core.Persistence;
public class DatabaseOptions : IValidatableObject
{
    public string Provider { get; set; } = "postgresql";
    public string ConnectionString { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(ConnectionString))
        {
            yield return new ValidationResult("ConnectionString cannot be empty in DatabaseOptions.", new[] { nameof(ConnectionString) });
        }
    }
}
