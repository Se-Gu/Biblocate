using BiblocateWebAPI.Models;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IShelfService
    {
        Task<string> GetShelfFromCallNumber(string callNumber);
    }
}
