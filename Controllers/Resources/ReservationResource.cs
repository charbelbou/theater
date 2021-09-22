namespace theater.Controllers.Resources
{
    // ReservationResource
    public class ReservationResource
    {
        public int PlayId { get; set; }
        // ReservationResource's PlayId
        public int UserId { get; set; }
        // ReservationResource's UserId
        public string Confirmed { get; set; }
        // Status of the reservation (confirmed, unconfirmed, or rejected)
        public string Place { get; set; }
        // ReservationResource seat (A5,B1...)
    }
}