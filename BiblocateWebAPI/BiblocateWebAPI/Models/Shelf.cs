#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiblocateWebAPI.Models
{
    [Table("Shelf")]
    public class Shelf
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int16 ShelfId { get; set; }
        public Int16 RoomId { get; set; }
        public Room Room { get; set; }
        [Required]
        public string LeftCallNumberBegin { get; set; }
        [Required]
        public string LeftCallNumberEnd { get; set; }
        [Required]
        public string RightCallNumberBegin { get; set; }
        [Required]
        public string RightCallNumberEnd { get; set; }
        [Required]
        public Single XCoordinate { get; set; }
        [Required]
        public Single YCoordinate { get; set; }
        [Required]
        public Single Height { get; set; }
        [Required]
        public Single Width { get; set; }
        public byte[]? Left_Image { get; set; }
        public byte[]? Right_Image { get; set; }

    }
}
