namespace SchoolApi.Models
{
    public class ProjectColumn
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProjectID { get; set; }
        public int UserID { get; set; }
        public Project Project { get; set; }
        public User User { get; set; }
    }
}