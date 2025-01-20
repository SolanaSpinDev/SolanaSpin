namespace SolanaSpin.Framework.Core.Identity.Transactions;

internal interface ITransactionService
{
    Task<IEnumerable<TransactionDto>> GetTransactionsForUserAsync(string userId);
}
