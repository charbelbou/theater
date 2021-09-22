using System.ComponentModel.DataAnnotations;

namespace theater.Models
{
    public class User
    {
        public int Id { get; set; }
        // User's Id
        [Required]
        public string Email { get; set; }
        // User's email
    }
}