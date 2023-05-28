using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DevicesAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameOfConnectedDevice",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "idConnectedDevice",
                table: "devices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameOfConnectedDevice",
                table: "devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "idConnectedDevice",
                table: "devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
