using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class DiceNotFoundException : NotFoundException
{
    public DiceNotFoundException(Guid id)
        : base($"dice with id {id} not found")
    {
    }
}
