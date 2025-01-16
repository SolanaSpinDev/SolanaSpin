using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolanaSpin.WebApi.Migrations.PostgreSQL.Identity
{
    /// <inheritdoc />
    public partial class AddDepositAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DepositAddress",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepositAddressPrivateKey",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepositAddress",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DepositAddressPrivateKey",
                schema: "identity",
                table: "Users");
        }
    }
}
