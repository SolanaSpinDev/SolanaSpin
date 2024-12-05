﻿using Microsoft.AspNetCore.Routing;

namespace FSH.Framework.Infrastructure.Identity.Social.Endpoints;
internal static class Extensions
{
    public static IEndpointRouteBuilder MapSocialEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapExternalLoginEndpoint();
        return app;
    }
}
