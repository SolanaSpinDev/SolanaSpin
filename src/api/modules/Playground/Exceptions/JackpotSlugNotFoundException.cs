using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class JackpotSlugNotFoundException : NotFoundException
{
    public JackpotSlugNotFoundException(string slug)
        : base($"jackpot with slug {slug} not found")
    {
    }
}
