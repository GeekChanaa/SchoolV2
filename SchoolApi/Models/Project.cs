namespace SchoolApi.Models
{
    public class Project
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
    }
}