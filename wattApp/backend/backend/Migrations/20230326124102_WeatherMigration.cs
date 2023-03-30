using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class WeatherMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "devicesdata",
                newName: "year");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "devicesdata",
                newName: "time");

            migrationBuilder.RenameColumn(
                name: "PowerUsage",
                table: "devicesdata",
                newName: "powerUsage");

            migrationBuilder.RenameColumn(
                name: "Month",
                table: "devicesdata",
                newName: "month");

            migrationBuilder.RenameColumn(
                name: "DeviceID",
                table: "devicesdata",
                newName: "deviceID");

            migrationBuilder.RenameColumn(
                name: "Day",
                table: "devicesdata",
                newName: "day");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "devicesdata",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "id",
                table: "devicesdata",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateTable(
                name: "weather",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    Month = table.Column<int>(type: "INTEGER", nullable: false),
                    Day = table.Column<int>(type: "INTEGER", nullable: false),
                    Time = table.Column<string>(type: "TEXT", nullable: true),
                    Temperature = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_weather", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "weather");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "devicesdata",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "time",
                table: "devicesdata",
                newName: "Time");

            migrationBuilder.RenameColumn(
                name: "powerUsage",
                table: "devicesdata",
                newName: "PowerUsage");

            migrationBuilder.RenameColumn(
                name: "month",
                table: "devicesdata",
                newName: "Month");

            migrationBuilder.RenameColumn(
                name: "deviceID",
                table: "devicesdata",
                newName: "DeviceID");

            migrationBuilder.RenameColumn(
                name: "day",
                table: "devicesdata",
                newName: "Day");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "devicesdata",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "devicesdata",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
