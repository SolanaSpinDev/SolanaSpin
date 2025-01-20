using SolanaSpin.Blazor.Infrastructure.Themes;

namespace SolanaSpin.Blazor.Infrastructure.Preferences;

public class ClientPreference : IPreference
{
    public bool IsDarkMode { get; set; } = true;
    public bool IsRTL { get; set; }
    public bool IsDrawerOpen { get; set; }
    public string PrimaryColor { get; set; } = CustomColors.Light.Primary;
    public string SecondaryColor { get; set; } = CustomColors.Light.Secondary;
    public double BorderRadius { get; set; } = 5;
    public AppTablePreference TablePreference { get; set; } = new AppTablePreference();
}
