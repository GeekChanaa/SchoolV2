namespace SchoolApi.Models
{
    public class Course
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TeacherID { get; set; }
        public Teacher Teacher { get; set; }
    }
}