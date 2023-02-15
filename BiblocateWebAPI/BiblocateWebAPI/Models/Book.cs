namespace BiblocateWebAPI.Models
{
    public class Book
    {
        public int? TitleID { get; set; }
        public TitleAvailabilityInfo? TitleAvailabilityInfo { get; set; }
        public string? MaterialType { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public int? YearOfPublication { get; set; }
        public string? Edition { get; set; }
        public int? CopiesOnOrder { get; set; }
        public List<string>? ISBN { get; set; }
        public int? DocumentNumber { get; set; }
        public string? CallNumber { get; set; }
    }
}