namespace theater.Models
{
    public class Photo
    {
        public int Id { get; set; }
        // Photo Id
        public string FileName { get; set; }
        // Photo FileName
        public int PlayId { get; set; }
        // Id of the play to which this photo belongs to
    }
}