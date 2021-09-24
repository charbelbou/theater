namespace theater.Controllers.Resources
{
    public class PhotoResource
    {
        public int Id { get; set; }
        // PhotoResource Id
        public string FileName { get; set; }
        // PhotoResource's FileName
        public int PlayId { get; set; }
        // Id of the play to which this photo belongs to
    }
}