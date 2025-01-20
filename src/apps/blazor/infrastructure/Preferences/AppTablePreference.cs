using SolanaSpin.Blazor.Shared.Notifications;

namespace SolanaSpin.Blazor.Infrastructure.Preferences;

public class AppTablePreference : INotificationMessage
{
    public bool IsDense { get; set; }
    public bool IsStriped { get; set; }
    public bool HasBorder { get; set; }
    public bool IsHoverable { get; set; }
}
