#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiblocateWebAPI.Models
{
    [Table("Shelf")]
    public class Shelf
    {
        [Key]
        public Int16 ShelfId { get; set; }
        [ForeignKey("Room")]
        public Int16 RoomId { get; set; }
        public string LeftCallNumberBegin { get; set; }
        public string LeftCallNumberEnd { get; set; }
        public string RightCallNumberBegin { get; set; }
        public string RightCallNumberEnd { get; set; }
        public Single XCoordinate { get; set; }
        public Single YCoordinate { get; set; }
        public byte[] PaintedShelfSchema { get; set; }
    }
}
