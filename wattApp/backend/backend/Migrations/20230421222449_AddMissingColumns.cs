using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                 name: "ImageId",
                 table: "devices",
                 type: "INTEGER",
                 nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "users",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "users");

        }
    }
}
