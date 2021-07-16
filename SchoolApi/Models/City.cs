namespace SchoolApi.Models
{
    public class City
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public int StateID { get; set; }
        public virtual State State {get; set;}
    }
}