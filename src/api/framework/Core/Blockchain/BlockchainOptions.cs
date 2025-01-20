namespace FSH.Framework.Infrastructure.Blockchain;
using System.Collections.ObjectModel;

public class BlockchainOptions
{
    public int Cluster { get; set; }
    public string CollectorAddress { get; set; } = string.Empty;
}
