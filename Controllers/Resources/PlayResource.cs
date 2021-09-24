using System.Collections.Generic;
using System.Collections.ObjectModel;

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
        public int Rows { get; set; }
        // Amount of rows available for the play
        public int Columns { get; set; }
        // Amount of columns available for the play
        public string Description { get; set; }
        // Description of the play
        public PhotoResource Photo { get; set; }
        // Play's photo

        public PlayResource()
        {
            Reservations = new Collection<ReservationResource>();
        }
    }
}