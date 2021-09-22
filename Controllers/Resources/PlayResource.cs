using System.Collections.Generic;
using System.Collections.ObjectModel;
using theater.Models;

namespace theater.Controllers.Resources
{
    public class PlayResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TheaterResource Theater { get; set; }
        public ICollection<ReservationResource> Reservations { get; set; }

        public PlayResource()
        {
            Reservations = new Collection<ReservationResource>();
        }
    }
}