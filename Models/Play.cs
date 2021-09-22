using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    // Play Model
    public class Play{
        public int Id { get; set; }
        // Play Id
        [Required]
        public string Name { get; set; }
        // Play Name
        public Theater Theater { get; set; }
        // The Theater to which this Play belongs to
        public ICollection<Reservation> Reservations { get; set; }
        // Collection of Reservations for this play

        public Play()
        {
            Reservations = new Collection<Reservation>();
        }
    }
}