namespace SchoolApi.Models
{
    public class Task
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProjectColumnID { get; set; }
        public int UserID { get; set; }
        public ProjectColumn ProjectColumn { get; set; }
        public User User { get; set; }
    }
}