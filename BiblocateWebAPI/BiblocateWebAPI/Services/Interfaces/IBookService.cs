using BiblocateWebAPI.Models;

namespace BiblocateWebAPI.Services.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> SearchBooks(string searchKey, int pageNumber);
    }
}
