using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BiblocateWebAPI.Services.Services
{
    public class ShelfService : IShelfService
    {
        private readonly BiblocateWebAPIDbContext _context;

        public ShelfService(BiblocateWebAPIDbContext context)
        {
            _context = context;
        }

        public async Task<int> DeleteShelf(short id)
        {
            var shelf = await _context.Shelf.FindAsync(id);
            if (shelf == null)
            {
                return -1;
            }

            _context.Shelf.Remove(shelf);
            await _context.SaveChangesAsync();

            return 0;
        }

        public async Task<IEnumerable<Shelf>> GetAllShelves()
        {
            return await _context.Shelf.ToListAsync();
        }

        public async Task<Shelf> GetShelf(short id)
        {
            return await _context.Shelf.FindAsync(id);
        }

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

        public async Task<IEnumerable<Shelf>> GetShelvesByRoomId(short roomId)
        {
            var shelves = await _context.Shelf.ToListAsync();
            return shelves.FindAll(s => s.RoomId == roomId);
        }

        public async void PostShelf(Shelf shelf)
        {
            _context.Shelf.Add(shelf);
            await _context.SaveChangesAsync();
        }

        public async Task<int> PutShelf(short id, Shelf shelf)
        {
            if (id != shelf.ShelfId)
            {
                return -1;
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
                    return 0;
                }
                else
                {
                    throw;
                }
            }

            return 1;
        }

        public bool ShelfExists(short id)
        {
            return _context.Shelf.Any(e => e.ShelfId == id);
        }
    }
}
