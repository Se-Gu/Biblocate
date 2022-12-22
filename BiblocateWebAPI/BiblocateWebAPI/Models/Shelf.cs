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
        public Int16 RoomId { get; set; }
        public string LeftCallnameBegin { get; set; }
        public string LeftCallnameEnd { get; set; }
        public string RightCallnameBegin { get; set; }
        public string RightCallnameEnd { get; set; }
        public Single XCoordinate { get; set; }
        public Single YCoordinate { get; set; }
    }
}
