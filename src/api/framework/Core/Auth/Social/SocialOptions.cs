using System.ComponentModel.DataAnnotations;

namespace FSH.Framework.Core.Auth.Social;

public class GooogleOptions
{
    public string ClientId { get; set; } = default!;
    public string ClientSecret { get; set; } = default!;
}

public class FacebookOptions
{
    public string ClientId { get; set; } = default!;
    public string ClientSecret { get; set; } = default!;
}

public class MicrosoftOptions
{
    public string ClientId { get; set; } = default!;
    public string ClientSecret { get; set; } = default!;
}

public class TwitterOptions
{
    public string ConsumerAPIKey { get; set; } = default!;
    public string ConsumerSecret { get; set; } = default!;
}

public class SocialOptions : IValidatableObject
{
    public GooogleOptions? Google { get; set; }
    public FacebookOptions? Facebook { get; set; }
    public MicrosoftOptions? Microsoft { get; set; }
    public TwitterOptions? Twitter { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Google is not null && (string.IsNullOrEmpty(Google.ClientId) || string.IsNullOrEmpty(Google.ClientSecret)))
        {
            yield return new ValidationResult("No ClientId or ClientSecret defined in Google SocialOptions", new[] { nameof(Google) });
        }

        if (Facebook is not null && (string.IsNullOrEmpty(Facebook.ClientId) || string.IsNullOrEmpty(Facebook.ClientSecret)))
        {
            yield return new ValidationResult("No ClientId or ClientSecret defined in Facebook SocialOptions", new[] { nameof(Facebook) });
        }

        if (Microsoft is not null && (string.IsNullOrEmpty(Microsoft.ClientId) || string.IsNullOrEmpty(Microsoft.ClientSecret)))
        {
            yield return new ValidationResult("No ClientId or ClientSecret defined in Microsoft SocialOptions", new[] { nameof(Microsoft) });
        }

        if (Twitter is not null && (string.IsNullOrEmpty(Twitter.ConsumerAPIKey) || string.IsNullOrEmpty(Twitter.ConsumerSecret)))
        {
            yield return new ValidationResult("No ConsumerAPIKey or ConsumerSecret defined in Twitter SocialOptions", new[] { nameof(Twitter) });
        }
    }
}
