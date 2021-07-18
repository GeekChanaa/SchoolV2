namespace SchoolApi.Models
{
    public class ProjectComment
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int ProjectID { get; set; }
        public int UserID { get; set; }
        public Project Project { get; set; }
        public User User { get; set; }
    }
}