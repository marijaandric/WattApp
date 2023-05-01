using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ressetPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_images",
                table: "images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "images");

            migrationBuilder.RenameTable(
                name: "images",
                newName: "dso_news");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "users",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetPasswordExpiryTime",
                table: "users",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ResetPasswordToken",
                table: "users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isDarkTheme",
                table: "users",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "devices",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddPrimaryKey(
                name: "PK_images",
                table: "images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_dso_news",
                table: "dso_news",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_images",
                table: "images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dso_news",
                table: "dso_news");

            migrationBuilder.DropColumn(
                name: "ResetPasswordExpiryTime",
                table: "users");

            migrationBuilder.DropColumn(
                name: "ResetPasswordToken",
                table: "users");

            migrationBuilder.DropColumn(
                name: "isDarkTheme",
                table: "users");

            migrationBuilder.RenameTable(
                name: "images",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "dso_news",
                newName: "images");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "users",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "devices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_images",
                table: "images",
                column: "Id");
        }
    }
}
