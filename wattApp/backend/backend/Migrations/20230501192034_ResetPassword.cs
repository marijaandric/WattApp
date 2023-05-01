using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ResetPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                 name: "ResetPasswordToken",
                 table: "users",
                 type: "TEXT",
                 nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResetPasswordExpiryTime",
                table: "users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "isDarkTheme",
                table: "users",
                type: "TEXT",
                nullable: true);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                 name: "ResetPasswordToken",
                 table: "users");

            migrationBuilder.DropColumn(
                name: "ResetPasswordExpiryTime",
                table: "users");

            migrationBuilder.DropColumn(
                name: "isDarkTheme",
                table: "users");
        }
    }
}
