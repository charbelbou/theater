namespace theater.Models
{
    public class Reservation{
        public Play Play { get; set; }
        // The play to which this reservation is for
        public int PlayId { get; set; }
        // The Id of the play to which this reservation is for
        public int UserId { get; set; }
        // The Id of the User which this reservation belongs to
        public string Confirmed { get; set; }
        // Status of the reservation (confirmed, unconfirmed, or rejected)
        public string Place { get; set; }
        // Reservation seat (A5,B1...)
    }
}