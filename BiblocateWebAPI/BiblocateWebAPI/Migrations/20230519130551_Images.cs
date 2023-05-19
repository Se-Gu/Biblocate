using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RightCallNumberEnd",
                table: "Shelf",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RightCallNumberBegin",
                table: "Shelf",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LeftCallNumberEnd",
                table: "Shelf",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LeftCallNumberBegin",
                table: "Shelf",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Height",
                table: "Shelf",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<byte[]>(
                name: "Left_Image",
                table: "Shelf",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Right_Image",
                table: "Shelf",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Width",
                table: "Shelf",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<byte[]>(
                name: "Base_Image",
                table: "Room",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.CreateIndex(
                name: "IX_Shelf_RoomId",
                table: "Shelf",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shelf_Room_RoomId",
                table: "Shelf",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shelf_Room_RoomId",
                table: "Shelf");

            migrationBuilder.DropIndex(
                name: "IX_Shelf_RoomId",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Left_Image",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Right_Image",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Base_Image",
                table: "Room");

            migrationBuilder.AlterColumn<string>(
                name: "RightCallNumberEnd",
                table: "Shelf",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "RightCallNumberBegin",
                table: "Shelf",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LeftCallNumberEnd",
                table: "Shelf",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "LeftCallNumberBegin",
                table: "Shelf",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
