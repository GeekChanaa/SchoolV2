namespace SchoolApi.Models
{
    public class TaskAssignment
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int TaskID { get; set; }
        public User User { get; set; }
        public Task Task { get; set; }
    }
}