namespace SchoolApi.Models
{
    public class Label
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
    }
}