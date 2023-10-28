using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ShelfImagesTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Left_Image",
                table: "Shelf");

            migrationBuilder.DropColumn(
                name: "Right_Image",
                table: "Shelf");

            migrationBuilder.CreateTable(
                name: "ShelfImages",
                columns: table => new
                {
                    ShelfId = table.Column<short>(type: "smallint", nullable: false),
                    LeftImage = table.Column<byte[]>(name: "Left_Image", type: "bytea", nullable: true),
                    RightImage = table.Column<byte[]>(name: "Right_Image", type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShelfImages", x => x.ShelfId);
                    table.ForeignKey(
                        name: "FK_ShelfImages_Shelf_ShelfId",
                        column: x => x.ShelfId,
                        principalTable: "Shelf",
                        principalColumn: "ShelfId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShelfImages");

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
        }
    }
}
