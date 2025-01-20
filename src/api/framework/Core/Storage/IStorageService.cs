using SolanaSpin.Framework.Core.Storage.File;
using SolanaSpin.Framework.Core.Storage.File.Features;

namespace SolanaSpin.Framework.Core.Storage;

public interface IStorageService
{
    public Task<Uri> UploadAsync<T>(FileUploadCommand? request, FileType supportedFileType, CancellationToken cancellationToken = default)
    where T : class;

    public void Remove(Uri? path);
}
