using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiblocateWebAPI.Models
{
    [Table("ShelfImages")]
    public class ShelfImages
    {
        [Key, ForeignKey("Shelf")]
        public Int16 ShelfId { get; set; }
        public Shelf Shelf { get; set; }
        public byte[]? Left_Image { get; set; }
        public byte[]? Right_Image { get; set; }
    }
}
