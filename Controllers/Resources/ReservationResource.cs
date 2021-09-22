namespace theater.Controllers.Resources
{
    public class ReservationResource
    {
        public int PlayId { get; set; }
        public int UserId { get; set; }
        public string Confirmed { get; set; }
        public string Place { get; set; }
    }
}