﻿#nullable disable

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
        [HttpGet("SearchBooks/{searchKey}/{pageNumber}")]
        public async Task<List<Book>> SearchBooks(string searchKey, int pageNumber)
        {
            const int PAGE_SIZE = 30;
            var hitsToDisplay = pageNumber * PAGE_SIZE;
            // set up the client and send request
            var firstRequestString = "http://139.179.30.27:8080/symws/rest/standard/searchCatalog?clientID=DS_CLIENT&term1=" + searchKey + "&hitsToDisplay=" + hitsToDisplay +"&libraryFilter=UNIVERSITY&json=true&prettyprint=true";
            var firstRequest = new HttpRequestMessage(HttpMethod.Get, firstRequestString);
            var client = _clientFactory.CreateClient();
            HttpResponseMessage firstResponse = await client.SendAsync(firstRequest);

            // receive and modify the json response
            var firstResponseText = await firstResponse.Content.ReadAsStringAsync();


            var queryIDString = "\"queryID\" : \"";
            var queryIDStartingIndex = firstResponseText.IndexOf(queryIDString) + queryIDString.Length;
            var queryIDEndingIndex = firstResponseText.IndexOf("\",");
            string queryID = firstResponseText.Substring(queryIDStartingIndex, queryIDEndingIndex - queryIDStartingIndex);

            var hitsToDisplayString = "\"totalHits\" : ";
            var hitsToDisplayStartingIndex = firstResponseText.IndexOf(hitsToDisplayString) + hitsToDisplayString.Length;
            var hitsToDisplayEndingIndex = firstResponseText.IndexOf(",", hitsToDisplayStartingIndex);
            int totalHits = int.Parse(firstResponseText.Substring(hitsToDisplayStartingIndex, hitsToDisplayEndingIndex - hitsToDisplayStartingIndex));


            var firstHitToDisplay = (pageNumber - 1) * PAGE_SIZE + 1;
            if (firstHitToDisplay > totalHits) return new List<Book>();
            var lastHitToDisplay =  hitsToDisplay > totalHits ? totalHits : pageNumber * PAGE_SIZE;

            var secondRequestString = "http://139.179.30.27:8080/symws/rest/standard/searchCatalogPaging?clientID=DS_CLIENT&queryID=" + queryID + "&firstHitToDisplay=" + firstHitToDisplay + "&lastHitToDisplay=" + lastHitToDisplay + "&includeAvailabilityInfo=true&json=true&prettyprint=true";


            var secondRequest = new HttpRequestMessage(HttpMethod.Get, secondRequestString);
            var secondResponse = await client.SendAsync(secondRequest);

            // receive and modify the json response
            var secondResponseText = await secondResponse.Content.ReadAsStringAsync();

            var cutoffString = "\"HitlistTitleInfo\" : ";
            var cutoffIndex = secondResponseText.IndexOf(cutoffString) + cutoffString.Length;
            if (cutoffIndex >= 0) secondResponseText = secondResponseText.Substring(cutoffIndex, secondResponseText.Length - cutoffIndex - 1);
            // turn the response into a list of Book objects
            var list = JsonConvert.DeserializeObject<List<Book>>(secondResponseText);

            // return the list of Book objects
            return list;
        }
    }
}
