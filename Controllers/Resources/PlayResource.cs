using System.Collections.Generic;
using System.Collections.ObjectModel;
using theater.Models;

namespace theater.Controllers.Resources
{
    // PlayResource
    public class PlayResource
    {
        public int Id { get; set; }
        // PlayResource Id
        public string Name { get; set; }
        // PlayResource name
        public TheaterResource Theater { get; set; }
        // TheaterResource to which this PlayResource belongs to
        public ICollection<ReservationResource> Reservations { get; set; }
        // Collection of ReservationResources which belong to this PlayResource

        public PlayResource()
        {
            Reservations = new Collection<ReservationResource>();
        }
    }
}