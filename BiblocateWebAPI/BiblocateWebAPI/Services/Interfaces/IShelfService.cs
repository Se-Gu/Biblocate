using BiblocateWebAPI.Models;
using BiblocateWebAPI.Models.Responses;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IShelfService
    {
        Task<ShelfResponse> GetShelfFromCallNumber(string callNumber);
    }
}
