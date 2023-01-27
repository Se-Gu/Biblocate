#nullable disable

using Microsoft.AspNetCore.Mvc;
using BiblocateWebAPI.Models;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IHttpClientFactory? _clientFactory;

        public BooksController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        // GET: api/<BooksController>
        [HttpGet]
        public async Task<List<Book>> GetBooks()
        {
            // set up the client and send request
            var request = new HttpRequestMessage(HttpMethod.Get, "http://139.179.30.27:8080/symws/rest/standard/searchInfoDesk?clientID=SymWSTestClient&customInfoDesk=CALD&json=true&prettyprint=true");
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
