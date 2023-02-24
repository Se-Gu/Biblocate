using BiblocateWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IShelfService
    {
        Task<IEnumerable<Shelf>> GetAllShelves();
        Task<Shelf> GetShelf(short id);
        Task<IEnumerable<Shelf>> GetShelvesByRoomId(short roomId);
        Task<int> PutShelf(short id, Shelf shelf);
        void PostShelf(Shelf shelf);
        Task<int> DeleteShelf(short id);
        bool ShelfExists(short id);
        Task<string> GetShelfFromCallNumber(string callNumber);
    }
}
