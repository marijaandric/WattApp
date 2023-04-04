using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "area",
                table: "users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "x",
                table: "users",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "y",
                table: "users",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "area",
                table: "users");

            migrationBuilder.DropColumn(
                name: "x",
                table: "users");

            migrationBuilder.DropColumn(
                name: "y",
                table: "users");
        }
    }
}
