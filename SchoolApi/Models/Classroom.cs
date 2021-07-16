using System;

namespace SchoolApi.Models
{
    public class Classroom
    {
        public int ID { get; set; }
        public int TrainingID { get; set; }
        public string Description { get; set; }
        public int SubModuleID { get; set; }
        public Training Training { get; set; }
        public SubModule SubModule { get; set; }
    }
}