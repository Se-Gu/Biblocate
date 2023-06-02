namespace BiblocateWebAPI.Models.Responses
{
    public class ShelfResponse
    {
        public Int16 ShelfId { get; set; }
        public Int16 RoomId { get; set; }
        public Room Room { get; set; }
        public string CallNumberBegin { get; set; }
        public string CallNumberEnd { get; set; }
        public Single XCoordinate { get; set; }
        public Single YCoordinate { get; set; }
        public Single Height { get; set; }
        public Single Width { get; set; }
        public byte[]? Image { get; set; }
    }
}
