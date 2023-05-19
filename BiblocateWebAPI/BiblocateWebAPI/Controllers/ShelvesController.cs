using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Services;
using BiblocateWebAPI.Services.Interfaces;
using System.Drawing;
using System.Reflection;

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelvesController : ControllerBase
    {
        private readonly BiblocateWebAPIDbContext _context;
        private readonly IShelfService _shelfService;

        public ShelvesController(BiblocateWebAPIDbContext context, IShelfService shelfService)
        {
            _context = context;
            _shelfService = shelfService;
        }

        [HttpGet("FindShelf/{callNumber}")]
        public async Task<ActionResult> GetShelfFromCallNumber(string callNumber)
        {
            byte[]b = await _shelfService.GetShelfFromCallNumber(callNumber);
            return File(b, "image/jpeg");
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

            return shelf == null ? NotFound() : shelf;
        }

        [HttpGet("in/{roomId}")]
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

        [HttpPost("Save/{roomId}")]
        public async Task<IActionResult> SaveShelves(short roomId, SaveDto saveDto)
        {
            foreach(var a in saveDto.Added)
            {
                Shelf shelf = new Shelf
                {
                    RoomId = a.RoomId,
                    XCoordinate = a.XCoordinate,
                    YCoordinate = a.YCoordinate,
                    LeftCallNumberBegin = a.LeftCallNumberBegin,
                    LeftCallNumberEnd = a.LeftCallNumberEnd,
                    RightCallNumberBegin = a.RightCallNumberBegin,
                    RightCallNumberEnd = a.RightCallNumberEnd,
                    Height = 100,
                    Width = 50
                };
                _context.Shelf.Add(shelf);
            }
            _context.Shelf.UpdateRange(saveDto.Updated);

            foreach (string id in saveDto.Deleted)
            {
                var shelf = await _context.Shelf.FindAsync(id);
                if (shelf == null)
                {
                    return NotFound();
                }
                _context.Shelf.Remove(shelf);
            }

            _context.SaveChanges();

            Byte[] b = _context.Room.Find(roomId).Base_Image;

            Bitmap bmp;
            Bitmap[] painted;
            using (var ms = new MemoryStream(b))
            {
                bmp = new Bitmap(ms);

                Pen bluePen = new Pen(Color.Blue, 84);
                Pen redPen = new Pen(Color.Red, 84);

                // D]raw line to screen.
                using (var graphics = Graphics.FromImage(bmp))
                {
                    foreach (Shelf shelf in _context.Shelf.Where((s) => s.RoomId.Equals(roomId))) {
                        bluePen.Width = shelf.Width;
                        graphics.DrawLine(bluePen, shelf.XCoordinate, shelf.YCoordinate, shelf.XCoordinate, shelf.YCoordinate + shelf.Height);
                    }
                }

                painted = new Bitmap[_context.Shelf.Count() * 2];
                int i = 0;
                foreach (Shelf shelf in _context.Shelf.Where((s) => s.RoomId.Equals(roomId))) {
                    painted[2 * i] = bmp;
                    painted[2 * i + 1] = bmp;
                    redPen.Width = shelf.Width / 2;
                    using (var graphics = Graphics.FromImage(painted[2 * i]))
                    {
                        graphics.DrawLine(bluePen, shelf.XCoordinate, shelf.YCoordinate, shelf.XCoordinate, shelf.YCoordinate + shelf.Height);
                    }
                    using (var graphics = Graphics.FromImage(painted[2 * i + 1]))
                    {
                        graphics.DrawLine(bluePen, shelf.XCoordinate + shelf.Width / 2, shelf.YCoordinate, shelf.XCoordinate + shelf.Width / 2, shelf.YCoordinate + shelf.Height);
                    }
                    i++;
                }
            }

            byte[][] paintedBytes = new byte[_context.Shelf.Count() * 2][];
            for(int i = 0; i < _context.Shelf.Count() * 2; i++)
            {
                using (var ms2 = new MemoryStream())
                {
                    painted[i].Save(ms2, System.Drawing.Imaging.ImageFormat.Jpeg);
                    paintedBytes[i] = ms2.ToArray();
                }
            }

            int j = 0;
            foreach(Shelf s in _context.Shelf.Where((s) => s.RoomId.Equals(roomId)))
            {
                s.Left_Image = paintedBytes[2 * j];
                s.Right_Image = paintedBytes[2 * j + 1];
                _context.Shelf.Update(s);
                j++;
            }
            

            //foreach(Shelf s in _context.Shelf.Where((s) => s.RoomId.Equals(roomId)))
            //using (var ms2 = new MemoryStream())
            //{
            //    bmp.Save(ms2, System.Drawing.Imaging.ImageFormat.Jpeg);
            //    b = ms2.ToArray();
            //}

            _context.SaveChanges();

            return NoContent();
            //return File(b, "image/jpeg");
        }
    }
}
