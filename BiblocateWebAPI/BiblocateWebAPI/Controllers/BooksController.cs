#nullable disable

using Microsoft.AspNetCore.Mvc;
using BiblocateWebAPI.Models;
using Newtonsoft.Json;
using BiblocateWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IHttpClientFactory? _clientFactory;
        private readonly BiblocateWebAPIDbContext _context;

        public BooksController(IHttpClientFactory clientFactory, BiblocateWebAPIDbContext context)
        {
            _clientFactory = clientFactory;
            _context = context;
        }

        // GET: api/<BooksController>
        [HttpGet("SearchBooks/{searchKey}/{hitsToDisplay}")]
        public async Task<List<Book>> SearchBooks(string searchKey, int hitsToDisplay)
        {
            // set up the client and send request
            var requestString = "http://139.179.30.27:8080/symws/rest/standard/searchCatalog?clientID=DS_CLIENT&term1=" + searchKey + "&hitsToDisplay=" + hitsToDisplay +"&includeAvailabilityInfo=true&libraryFilter=UNIVERSITY&&json=true&&prettyprint=true";
            var request = new HttpRequestMessage(HttpMethod.Get, requestString);
            var client = _clientFactory.CreateClient();
            HttpResponseMessage response = await client.SendAsync(request);

            // receive and modify the json response
            var responseText = await response.Content.ReadAsStringAsync();
            var cutoffString = "\"HitlistTitleInfo\" : ";
            var cutoffIndex = responseText.IndexOf(cutoffString) + cutoffString.Length;
            if (cutoffIndex >= 0) responseText = responseText.Substring(cutoffIndex, responseText.Length - cutoffIndex - 1);

            // turn the response into a list of Book objects
            var list = JsonConvert.DeserializeObject<List<Book>>(responseText);

            // return the list of Book objects
            return list;
        }
    }
}
