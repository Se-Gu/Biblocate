using BiblocateWebAPI.Models;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IShelfService
    {
        Task<byte[]> GetShelfFromCallNumber(string callNumber);
    }
}
