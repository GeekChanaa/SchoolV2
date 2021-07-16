using System;

namespace SchoolApi.Models
{
    public class Exam
    {
        public int ID { get; set; }
        public int ClassroomID { get; set; }
        public int SubModuleID { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Description { get; set; }
        public Classroom Classroom { get; set; }
        public SubModule SubModule { get; set; }
    }
}