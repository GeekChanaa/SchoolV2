namespace SchoolApi.Models
{
    public class ProjectMember
    {
        public int ID { get; set; }
        public int ProjectID { get; set; }
        public int UserID { get; set; }
        public Project Project { get; set; }
        public User User { get; set; }
    }
}