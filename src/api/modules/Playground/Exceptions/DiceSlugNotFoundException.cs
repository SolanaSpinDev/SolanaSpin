using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class DiceSlugNotFoundException : NotFoundException
{
    public DiceSlugNotFoundException(string slug)
        : base($"dice with slug {slug} not found")
    {
    }
}
