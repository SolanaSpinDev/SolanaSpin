namespace SolanaSpin.Framework.Infrastructure.Blockchain;

public class BlockchainOptions
{
    public int Cluster { get; set; }
    public string HotWalletAddress { get; set; } = string.Empty;
    public string HotWalletAddressPrivateKey { get; set; } = string.Empty;
    public decimal DepositFee { get; set; }
    public decimal WithdrawalFee { get; set; }
    public string FeeCollectorAddress { get; set; } = string.Empty;
    public ulong TransactionFee { get; set; }
    public decimal BalanceConversionRate { get; set; }

}
