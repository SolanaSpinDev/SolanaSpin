using System.Collections.ObjectModel;
using System.Net;

namespace SolanaSpin.Framework.Core.Exceptions;
public class BadRequestException : AppException
{
    public BadRequestException(string message)
        : base(message, new Collection<string>(), HttpStatusCode.BadRequest)
    {
    }
}
