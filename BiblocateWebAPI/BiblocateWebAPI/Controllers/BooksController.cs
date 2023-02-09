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

        public BooksController(IHttpClientFactory clientFactory,  BiblocateWebAPIDbContext context)
        {
            _clientFactory = clientFactory;
            _context = context;
        }

        //// GET: api/<BooksController>
        //[HttpGet]
        //public async Task<List<Book>> GetBooks()
        //{
        //    // set up the client and send request
        //    var request = new HttpRequestMessage(HttpMethod.Get, "http://139.179.30.27:8080/symws/rest/standard/searchInfoDesk?clientID=SymWSTestClient&customInfoDesk=CALD&json=true&prettyprint=true");
        //    var client = _clientFactory.CreateClient();
        //    HttpResponseMessage response = await client.SendAsync(request);

        //    // receive and modify the json response
        //    var responseText = await response.Content.ReadAsStringAsync();
        //    var cutoffString = "\"HitlistTitleInfo\" : ";
        //    var cutoffIndex = responseText.IndexOf(cutoffString) + cutoffString.Length;
        //    if (cutoffIndex >= 0) responseText = responseText.Substring(cutoffIndex, responseText.Length - cutoffIndex - 1);

        //    // turn the response into a list of Book objects
        //    var list = JsonConvert.DeserializeObject<List<Book>>(responseText);

        //    // return the list of Book objects
        //    return list;
        //}

        [HttpGet]
        public async Task<string> GetShelfFromCallNumber(string callNumber)
        {
            Match dissectAlphaNumerical(string alphaNumerical)
            {
                Regex re = new Regex(@"([a-zA-Z]+)(\d+)");
                return re.Match(alphaNumerical);
            }
            int myCompare(string callNumber1, string callNumber2)
            {
                var callNumber1A = dissectAlphaNumerical(callNumber1).Groups[1].Value;
                var callNumber1N = Int32.Parse(dissectAlphaNumerical(callNumber1).Groups[2].Value);
                var callNumber2A = dissectAlphaNumerical(callNumber2).Groups[1].Value;
                var callNumber2N = Int32.Parse(dissectAlphaNumerical(callNumber2).Groups[2].Value);

                if (string.Compare(callNumber1A, callNumber2A) == 0)
                {
                    if (callNumber1N < callNumber2N) return -1;
                    else if (callNumber1N == callNumber2N) return 0;
                    else return 1;
                }
                else return string.Compare(callNumber1A, callNumber2A);
            }
            // remove white space from callNumber
            var newCallNumber = Regex.Replace(callNumber, @"\s+", "");

            var shelfList = await _context.Shelf.ToListAsync();

            foreach (var shelf in shelfList)
            {
                bool onTheLeftSide = myCompare(shelf.LeftCallNumberBegin, newCallNumber) <= 0 && myCompare(shelf.LeftCallNumberEnd, newCallNumber) >= 0;
                bool onTheRightSide = myCompare(shelf.RightCallNumberBegin, newCallNumber) <= 0 && myCompare(shelf.RightCallNumberEnd, newCallNumber) >= 0;

                if (onTheLeftSide) return shelf.ShelfId + "A";
                else if (onTheRightSide) return shelf.ShelfId + "B";
            }
            return "does not exist!";
        }
    }
}
