using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateUserAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "y",
                table: "users",
                newName: "Y");

            migrationBuilder.RenameColumn(
                name: "x",
                table: "users",
                newName: "X");

            migrationBuilder.RenameColumn(
                name: "area",
                table: "users",
                newName: "Area");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Y",
                table: "users",
                newName: "y");

            migrationBuilder.RenameColumn(
                name: "X",
                table: "users",
                newName: "x");

            migrationBuilder.RenameColumn(
                name: "Area",
                table: "users",
                newName: "area");
        }
    }
}
