namespace BiblocateWebAPI.Models
{
    public class SaveDto
    {
        public Shelf[] Added { get; set; }
        public Shelf[] Updated { get; set; }
        public string[] Deleted { get; set; }
    }
}
