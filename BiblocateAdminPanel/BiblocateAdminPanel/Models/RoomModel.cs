using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BiblocateAdminPanel.Models
{
    public class RoomModel
    {
        public string Id { get; set; }
        public List<ShelfModel> Shelves { get; set; }
    }
}