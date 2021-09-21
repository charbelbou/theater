using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    public class Theater
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}