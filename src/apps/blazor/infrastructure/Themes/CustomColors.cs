using MudBlazor;

namespace SolanaSpin.Blazor.Infrastructure.Themes;

public static class CustomColors
{
    public const string RoyalViolet = "#8233FF"; // Symbolizes elegance and creativity.
    public const string CrimsonBlaze = "#C00D0D"; // Evokes passion and intensity.
    public const string SurgeGreen = "#00FFA3"; // Represents growth and energy.
    public const string OceanBlue = "#03E1FF"; // Conveys calmness and trust.
    public const string PurpleDino = "#DC1FFF"; // Adds a touch of class and luxury.
    public const string Black = "#000000"; // Provides a sleek and modern look.
    public const string SunsetOrange = "#FF4500"; // Evokes excitement and enthusiasm.
    public const string RoyalBlue = "#4169E1"; // Conveys trust and reliability.
    public const string Gold = "#FFD700"; // Symbolizes wealth and success.
    public const string Silver = "#C0C0C0"; // Represents sophistication and modernity.
    public const string White = "#FFFFFF"; // Represents purity and simplicity.
    public const string GunMetal = "#2A3439"; // Conveys strength and resilience.
    public const string DavysGrey = "#545454";
    public const string BlackPearl = "#1b1f22";
    public const string ChineseBlack = "#121212";
    public const string DimGrey = "#6f6f6f";

    public static readonly List<string> ThemeColors = new()
    {
        RoyalViolet,
        SurgeGreen,
        Black,
        RoyalBlue,
        SunsetOrange,
        GunMetal,
        PurpleDino,
        White,
        OceanBlue,
        Gold,
        Silver,
        CrimsonBlaze,
    };

    public static class Light
    {
        public const string Primary = RoyalViolet;
        public const string Secondary = OceanBlue;
        public const string Background = White;
        public const string AppbarBackground = White;
        public const string AppbarText = DimGrey;
    }

    public static class Dark
    {
        public const string Primary = RoyalViolet;
        public const string Secondary = OceanBlue;
        public const string Background = BlackPearl;
        public const string AppbarBackground = BlackPearl;
        public const string DrawerBackground = ChineseBlack;
        public const string Surface = GunMetal;
        public const string Disabled = DavysGrey;
    }
}
