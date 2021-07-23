using System;

namespace SchoolApi.Models
{
    public class Notification
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Action { get; set; }
        public string ActionOn { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
    }
}