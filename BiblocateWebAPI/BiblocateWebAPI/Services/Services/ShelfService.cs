using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Models.Responses;
using BiblocateWebAPI.Services.Interfaces;
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

        public async Task<ShelfResponse> GetShelfFromCallNumber(string callNumber)
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

            var shelfList = await _context.Shelf.Select(s => new
            {
                ShelfId = s.ShelfId,
                LeftCallNumberBegin = s.LeftCallNumberBegin,
                LeftCallNumberEnd = s.LeftCallNumberEnd,
                RightCallNumberBegin = s.RightCallNumberBegin,
                RightCallNumberEnd = s.RightCallNumberEnd
            }).ToListAsync();
            
            ShelfResponse theShelf = new();

            foreach (var s in shelfList)
            {
                bool onTheLeftSide = myCompare(s.LeftCallNumberBegin, newCallNumber) <= 0 && myCompare(s.LeftCallNumberEnd, newCallNumber) >= 0;
                bool onTheRightSide = myCompare(s.RightCallNumberBegin, newCallNumber) <= 0 && myCompare(s.RightCallNumberEnd, newCallNumber) >= 0;

                Shelf shelf = _context.Shelf.Where(sh => sh.ShelfId.Equals(s.ShelfId)).First();
                ShelfImages images = _context.ShelfImages.Where(sh => sh.ShelfId.Equals(s.ShelfId)).First();
                theShelf.ShelfId = shelf.ShelfId;
                theShelf.RoomId = shelf.RoomId;
                theShelf.RoomName = _context.Room.Where(r => r.RoomId.Equals(shelf.RoomId)).First().RoomName;
                theShelf.XCoordinate = shelf.XCoordinate;
                theShelf.YCoordinate = shelf.YCoordinate;
                theShelf.Height = shelf.Height;
                theShelf.Width = shelf.Width;

                if (onTheLeftSide)
                {
                    theShelf.CallNumberBegin = shelf.LeftCallNumberBegin;
                    theShelf.CallNumberEnd = shelf.LeftCallNumberEnd;
                    theShelf.Image = images.Left_Image;
                }
                else if (onTheRightSide)
                {
                    theShelf.CallNumberBegin = shelf.RightCallNumberBegin;
                    theShelf.CallNumberEnd = shelf.RightCallNumberEnd;
                    theShelf.Image = images.Right_Image;
                }

                return theShelf;
            }
            return theShelf;
        }
    }
}
