using System.Collections.ObjectModel;
using System.Net;

namespace SolanaSpin.Framework.Core.Exceptions;
public class NotFoundException : AppException
{
    public NotFoundException(string message)
        : base(message, new Collection<string>(), HttpStatusCode.NotFound)
    {
    }
}
