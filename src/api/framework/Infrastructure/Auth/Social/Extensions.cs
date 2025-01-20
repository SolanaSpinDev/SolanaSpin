using SolanaSpin.Framework.Core.Auth.Social;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;

namespace SolanaSpin.Framework.Infrastructure.Auth.Social;
internal static class Extensions
{
    internal static AuthenticationBuilder AddSocialAuth(this AuthenticationBuilder auth, IConfiguration config)
    {
        var socialOptions = config.GetSection(nameof(SocialOptions)).Get<SocialOptions>();
        if (socialOptions is not null)
        {
            if (socialOptions.Google is not null)
            {
                auth.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
                {
                    options.ClientId = socialOptions.Google.ClientId;
                    options.ClientSecret = socialOptions.Google.ClientSecret;
                });
            }
            if (socialOptions.Facebook is not null)
            {
                auth.AddFacebook(FacebookDefaults.AuthenticationScheme, options =>
                {
                    options.ClientId = socialOptions.Facebook.ClientId;
                    options.ClientSecret = socialOptions.Facebook.ClientSecret;
                });
            }
            if (socialOptions.Microsoft is not null)
            {
                auth.AddMicrosoftAccount(MicrosoftAccountDefaults.AuthenticationScheme, microsoftOptions =>
                {
                    microsoftOptions.ClientId = socialOptions.Microsoft.ClientId;
                    microsoftOptions.ClientSecret = socialOptions.Microsoft.ClientSecret;
                });
            }
            if (socialOptions.Twitter is not null)
            {
                auth.AddTwitter(TwitterDefaults.AuthenticationScheme, twitterOptions =>
                {
                    twitterOptions.ConsumerKey = socialOptions.Twitter.ConsumerAPIKey;
                    twitterOptions.ConsumerSecret = socialOptions.Twitter.ConsumerSecret;
                    twitterOptions.RetrieveUserDetails = true;
                });
            }
        }
        return auth;
    }
}
