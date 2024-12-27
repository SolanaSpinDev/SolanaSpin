using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolanaSpin.WebApi.Migrations.MSSQL.Identity
{
    /// <inheritdoc />
    public partial class AddBalance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                schema: "identity",
                table: "Users",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                schema: "identity",
                table: "Users");
        }
    }
}
