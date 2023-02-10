namespace BiblocateWebAPI.Models
{
    public class TitleAvailabilityInfo
    {
        public int? TotalCopiesAvailable { get; set; }
        public List<string>? LibraryWithAvailableCopies { get; set; }
        public int? TotalReservedCopiesAvailable { get; set; }
        public List<string>? LibraryWithAvailableReservedCopies { get; set; }
        public string? LocationOfTheFirstAvailableItem { get; set; }
        public bool? Holdable { get; set; }
        public bool? Bookable { get; set; }
    }
}
