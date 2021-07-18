namespace SchoolApi.Models
{
    public class HomeworkComment
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int HomeworkID { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public Homework Homework { get; set; }
    }
}