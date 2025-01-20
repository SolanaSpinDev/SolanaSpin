using System.Collections.ObjectModel;
using System.Net;

namespace SolanaSpin.Framework.Core.Exceptions;
public class ForbiddenException : AppException
{
    public ForbiddenException()
        : base("unauthorized", new Collection<string>(), HttpStatusCode.Forbidden)
    {
    }
    public ForbiddenException(string message)
       : base(message, new Collection<string>(), HttpStatusCode.Forbidden)
    {
    }
}
