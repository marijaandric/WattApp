using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddImageTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "images",
            columns: table => new
            {
                Id = table.Column<int>(type: "INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Name = table.Column<string>(type: "TEXT", nullable: true),
                ContentType = table.Column<string>(type: "TEXT", nullable: true),
                Data = table.Column<byte[]>(type: "BLOB", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Images", x => x.Id);
            });

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

            migrationBuilder.CreateIndex(
                name: "IX_devices_ImageId",
                table: "devices",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_users_ImageId",
                table: "users",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_devices_Images_ImageId",
                table: "devices",
                column: "ImageId",
                principalTable: "images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_users_Images_ImageId",
                table: "users",
                column: "ImageId",
                principalTable: "images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
            name: "FK_devices_Images_ImageId",
            table: "devices");

            migrationBuilder.DropForeignKey(
                name: "FK_users_Images_ImageId",
                table: "users");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropIndex(
                name: "IX_devices_ImageId",
                table: "devices");

            migrationBuilder.DropIndex(
                name: "IX_users_ImageId",
                table: "users");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "users");

        }
    }
}
