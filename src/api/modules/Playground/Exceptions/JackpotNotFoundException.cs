using SolanaSpin.Framework.Core.Exceptions;

namespace SolanaSpin.WebApi.Playground.Exceptions;
internal sealed class JackpotNotFoundException : NotFoundException
{
    public JackpotNotFoundException(Guid id)
        : base($"jackpot with id {id} not found")
    {
    }
}
