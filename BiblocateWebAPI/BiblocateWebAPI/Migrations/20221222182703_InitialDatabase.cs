using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Room",
                columns: table => new
                {
                    RoomId = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoomName = table.Column<string>(type: "text", nullable: false),
                    NumOfShelves = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.RoomId);
                });

            migrationBuilder.CreateTable(
                name: "Shelf",
                columns: table => new
                {
                    ShelfId = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoomId = table.Column<short>(type: "smallint", nullable: false),
                    LeftCallnameBegin = table.Column<string>(type: "text", nullable: true),
                    LeftCallnameEnd = table.Column<string>(type: "text", nullable: true),
                    RightCallnameBegin = table.Column<string>(type: "text", nullable: true),
                    RightCallnameEnd = table.Column<string>(type: "text", nullable: true),
                    XCoordinate = table.Column<float>(type: "real", nullable: false),
                    YCoordinate = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shelf", x => x.ShelfId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Room");

            migrationBuilder.DropTable(
                name: "Shelf");
        }
    }
}
