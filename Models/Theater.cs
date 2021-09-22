using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    public class Theater
    {
        public int Id { get; set; }
        // Theater Id
        [Required]
        public string Name { get; set; }
        // Theater Name
        public ICollection<Play> Plays { get; set; }
        // Collection of plays which are being hosted in this theater
        public Theater()
        {
            Plays = new Collection<Play>();
        }
    }
}