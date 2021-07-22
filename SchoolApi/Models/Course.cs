namespace SchoolApi.Models
{
    public class Course
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TeacherID { get; set; }
        public int? ClassroomID { get; set; }
        public int? TrainingID { get; set; }
        public int? SubModuleID { get; set; }
        public Teacher Teacher { get; set; }
        public Classroom Classroom { get; set; }
        public SubModule SubModule { get; set; }
        public Training Training { get; set; }
    }
}