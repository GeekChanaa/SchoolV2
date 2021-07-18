using System;

namespace SchoolApi.Models
{
    public class Assignment
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public int? SubModuleID { get; set; }
        public int ClassroomID { get; set; }
        public Classroom Classroom { get; set; }
        public SubModule SubModule { get; set; }
    }
}