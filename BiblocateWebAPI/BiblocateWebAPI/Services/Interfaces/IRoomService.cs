using BiblocateWebAPI.Models;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<Room>> GetAllRooms();
        Task<Room> GetRoom(short id);
        Task<int> PutRoom(short id, Room room);
        void PostRoom(Room room);
        Task<int> DeleteRoom(short id);
        bool RoomExists(short id);
    }
}
