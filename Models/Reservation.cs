namespace theater.Models
{
    public class Reservation{
        public Play Play { get; set; }
        public int PlayId { get; set; }
        public int UserId { get; set; }
        public string Confirmed { get; set; }
        public string Place { get; set; }
    }
}