namespace SchoolApi.Models
{
    public class TaskComment
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int TaskID { get; set; }
        public int UserID { get; set; }
        public Task Task { get; set; }
        public User User { get; set; }
    }
}