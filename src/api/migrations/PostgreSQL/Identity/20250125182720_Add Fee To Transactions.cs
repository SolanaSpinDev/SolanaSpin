using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolanaSpin.WebApi.Migrations.PostgreSQL.Identity
{
    /// <inheritdoc />
    public partial class AddFeeToTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Fee",
                schema: "identity",
                table: "Transactions",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fee",
                schema: "identity",
                table: "Transactions");
        }
    }
}
