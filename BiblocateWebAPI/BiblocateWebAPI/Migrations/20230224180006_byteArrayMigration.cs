using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class byteArrayMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PaintedShelfSchema",
                table: "Shelf",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "RoomSchema",
                table: "Room",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaintedShelfSchema",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "RoomSchema",
                table: "Room");
        }
    }
}
