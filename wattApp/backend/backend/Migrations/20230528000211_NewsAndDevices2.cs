using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class NewsAndDevices2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_devices_devices_DevicesId",
                table: "devices");

            migrationBuilder.DropIndex(
                name: "IX_devices_DevicesId",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "DevicesId",
                table: "devices");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameOfConnectedDevice",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "idConnectedDevice",
                table: "devices");

            migrationBuilder.AddColumn<int>(
                name: "DevicesId",
                table: "devices",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_devices_DevicesId",
                table: "devices",
                column: "DevicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_devices_devices_DevicesId",
                table: "devices",
                column: "DevicesId",
                principalTable: "devices",
                principalColumn: "Id");
        }
    }
}
