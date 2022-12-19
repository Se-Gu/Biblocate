using BiblocateAdminPanel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BiblocateAdminPanel.Controllers
{
    public class RoomController : Controller
    {
        // GET: Room
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Interval(string id)
        {
            if (id == null)
                return RedirectToAction("Interval/1");

            RoomModel rm = new RoomModel();
            rm.Id = "n-tr";
            rm.Shelves = new List<ShelfModel>();
            rm.Shelves.Add(new ShelfModel
            {
                Id = 1,
                X = 900,
                Y = 100,
                a1 = "100",
                a2 = "200",
                b1 = "201",
                b2 = "300"
            });
            rm.Shelves.Add(new ShelfModel
            {
                Id = 2,
                X = 1000,
                Y = 100,
                a1 = "301",
                a2 = "400",
                b1 = "401",
                b2 = "500"
            });

            return View(rm);
        }

        public ActionResult Edit(string id)
        {
            if (id == null)
                //return new HttpStatusCodeResult(404);
                return RedirectToAction("Edit/1");
            //System.Diagnostics.Debug.WriteLine(id);

            RoomModel rm = new RoomModel();
            rm.Id = "n-tr";
            rm.Shelves = new List<ShelfModel>();
            rm.Shelves.Add(new ShelfModel
            {
                Id = 1,
                X = 900,
                Y = 100,
                a1 = "100",
                a2 = "200",
                b1 = "201",
                b2 = "300"
            });
            rm.Shelves.Add(new ShelfModel
            {
                Id = 2,
                X = 1000,
                Y = 100,
                a1 = "301",
                a2 = "400",
                b1 = "401",
                b2 = "500"
            });

            return View(rm);
        }

        public ActionResult Navbar()
        {
            List<string> rooms = new List<string>();
            rooms.Add("n-tr");
            return PartialView("_Navbar",rooms);
        }

        public JsonResult EditInterval(string id)
        {
            ShelfModel shelf = new ShelfModel
            {
                Id = 1,
                X = 1000,
                Y = 100,
                a1 = "301",
                a2 = "400",
                b1 = "401",
                b2 = "500"
            };

            return Json(shelf, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Interval(ShelfModel newShelf)
        {
            System.Diagnostics.Debug.WriteLine(newShelf.Id + " - " + newShelf.a1);
            return RedirectToAction("Interval/"+newShelf.Id);
        }

        [HttpPost]
        public JsonResult Edit(String id, List<ShelfModel> added)
        {
            if (added == null)
                return Json("null");
            return Json(added.First());
            //return Json(new { message = "Room " + id });
        }
    }
}