using System;

namespace SchoolApi.Models
{
    public class Attendance
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public SubModule SubModule { get; set; }
    }
}