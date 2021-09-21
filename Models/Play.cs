using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    public class Play{
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Theater Theater { get; set; }
        public ICollection<Reservation> Reservations { get; set; }

        public Play()
        {
            Reservations = new Collection<Reservation>();
        }
    }
}