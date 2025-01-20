using SolanaSpin.Blazor.Infrastructure.Preferences;
using SolanaSpin.Blazor.Infrastructure.Themes;
using MudBlazor;

namespace SolanaSpin.Blazor.Client.Layout;

public partial class BaseLayout
{
    private ClientPreference? _themePreference;
    private MudTheme _currentTheme = new AppTheme();
    private bool _themeDrawerOpen;
    private bool _rightToLeft;
    private bool _isDarkMode;

    protected override async Task OnInitializedAsync()
    {
        _themePreference = await ClientPreferences.GetPreference() as ClientPreference;
        if (_themePreference == null) _themePreference = new ClientPreference();
        SetCurrentTheme(_themePreference);
    }

    private async Task ToggleDarkLightMode(bool isDarkMode)
    {
        if (_themePreference is not null)
        {
            _themePreference.IsDarkMode = isDarkMode;
            await ThemePreferenceChanged(_themePreference);
        }
    }

    private async Task ThemePreferenceChanged(ClientPreference themePreference)
    {
        SetCurrentTheme(themePreference);
        await ClientPreferences.SetPreference(themePreference);
    }

    private void SetCurrentTheme(ClientPreference themePreference)
    {
        _isDarkMode = themePreference.IsDarkMode;
        _currentTheme.PaletteLight.Primary = themePreference.PrimaryColor;
        _currentTheme.PaletteLight.Secondary = themePreference.SecondaryColor;
        _currentTheme.PaletteDark.Primary = themePreference.PrimaryColor;
        _currentTheme.PaletteDark.Secondary = themePreference.SecondaryColor;
        _currentTheme.LayoutProperties.DefaultBorderRadius = $"{themePreference.BorderRadius}px";
        _currentTheme.LayoutProperties.DefaultBorderRadius = $"{themePreference.BorderRadius}px";
        _rightToLeft = themePreference.IsRTL;
    }
}
