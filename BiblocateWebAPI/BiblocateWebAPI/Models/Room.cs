using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiblocateWebAPI.Models
{
    [Table("Room")]
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int16 RoomId { get; set; }
        [Required]  
        public string RoomName { get; set; }
        [Required]
        public ICollection<Shelf> Shelves { get; set; }
        [Required]
        public byte[] Base_Image { get; set; }
    }
}
