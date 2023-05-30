using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class NewsAndDevices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "dso_news",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DevicesId",
                table: "devices",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Manufacturer",
                table: "devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ManufacturingYear",
                table: "devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "devices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Power",
                table: "devices",
                type: "TEXT",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_devices_devices_DevicesId",
                table: "devices");

            migrationBuilder.DropIndex(
                name: "IX_devices_DevicesId",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "dso_news");

            migrationBuilder.DropColumn(
                name: "DevicesId",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "Manufacturer",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "ManufacturingYear",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "Power",
                table: "devices");
        }
    }
}
