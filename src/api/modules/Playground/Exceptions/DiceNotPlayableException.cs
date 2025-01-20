using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class DiceNotPlayableException : NotFoundException
{
    public DiceNotPlayableException(Guid id)
        : base($"dice with id {id} not playable")
    {
    }
}
