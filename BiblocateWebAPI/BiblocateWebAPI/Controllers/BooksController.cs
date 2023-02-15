#nullable disable

using Microsoft.AspNetCore.Mvc;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;   

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/<BooksController>
        [HttpGet("SearchBooks/{searchKey}/{pageNumber}")]
        public async Task<List<Book>> SearchBooks(string searchKey, int pageNumber)
        {
            return await _bookService.SearchBooks(searchKey, pageNumber);
        }
    }
}
