using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class DBVersion2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumOfShelves",
                table: "Room");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "NumOfShelves",
                table: "Room",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }
    }
}
