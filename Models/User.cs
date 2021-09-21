using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
    }
}