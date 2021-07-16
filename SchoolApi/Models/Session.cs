using System;

namespace SchoolApi.Models
{
    public class Session
    {
        public int ID { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int TrainingID { get; set; }
        public int SubModuleID { get; set; }
        public Training Training { get; set; }
        public SubModule SubModule { get; set; }
    }
}