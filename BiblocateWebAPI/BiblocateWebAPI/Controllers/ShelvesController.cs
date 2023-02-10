using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using System.Text.RegularExpressions;

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelvesController : ControllerBase
    {
        private readonly BiblocateWebAPIDbContext _context;

        public ShelvesController(BiblocateWebAPIDbContext context)
        {
            _context = context;
        }

        [HttpGet("FindShelf/{callNumber}")]
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

        // GET: api/Shelves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shelf>>> GetShelf()
        {
            return await _context.Shelf.ToListAsync();
        }

        // GET: api/Shelves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shelf>> GetShelf(short id)
        {
            var shelf = await _context.Shelf.FindAsync(id);

            if (shelf == null)
            {
                return NotFound();
            }

            return shelf;
        }

        [HttpGet("{roomId}")]
        public async Task<ActionResult<IEnumerable<Shelf>>> GetShelvesByRoomId(short roomId)
        {
            var shelves = await _context.Shelf.ToListAsync();
            return shelves.FindAll(s => s.RoomId == roomId);
        }

        // PUT: api/Shelves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShelf(short id, Shelf shelf)
        {
            if (id != shelf.ShelfId)
            {
                return BadRequest();
            }

            _context.Entry(shelf).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelfExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shelves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shelf>> PostShelf(Shelf shelf)
        {
            _context.Shelf.Add(shelf);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShelf", new { id = shelf.ShelfId }, shelf);
        }

        // DELETE: api/Shelves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShelf(short id)
        {
            var shelf = await _context.Shelf.FindAsync(id);
            if (shelf == null)
            {
                return NotFound();
            }

            _context.Shelf.Remove(shelf);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShelfExists(short id)
        {
            return _context.Shelf.Any(e => e.ShelfId == id);
        }
    }
}
