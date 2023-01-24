using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class MigrationChangeCallnameToCallNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RightCallnameEnd",
                table: "Shelf",
                newName: "RightCallNumberEnd");

            migrationBuilder.RenameColumn(
                name: "RightCallnameBegin",
                table: "Shelf",
                newName: "RightCallNumberBegin");

            migrationBuilder.RenameColumn(
                name: "LeftCallnameEnd",
                table: "Shelf",
                newName: "LeftCallNumberEnd");

            migrationBuilder.RenameColumn(
                name: "LeftCallnameBegin",
                table: "Shelf",
                newName: "LeftCallNumberBegin");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RightCallNumberEnd",
                table: "Shelf",
                newName: "RightCallnameEnd");

            migrationBuilder.RenameColumn(
                name: "RightCallNumberBegin",
                table: "Shelf",
                newName: "RightCallnameBegin");

            migrationBuilder.RenameColumn(
                name: "LeftCallNumberEnd",
                table: "Shelf",
                newName: "LeftCallnameEnd");

            migrationBuilder.RenameColumn(
                name: "LeftCallNumberBegin",
                table: "Shelf",
                newName: "LeftCallnameBegin");
        }
    }
}
