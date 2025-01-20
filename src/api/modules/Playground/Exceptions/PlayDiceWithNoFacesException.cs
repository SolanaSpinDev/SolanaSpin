using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class PlayDiceWithNoFacesException : BadRequestException
{
    public PlayDiceWithNoFacesException(Guid id)
        : base($"dice with id {id} faces missing")
    {
    }
}
