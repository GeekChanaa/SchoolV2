using System;

namespace SchoolApi.Models
{
    public class DocumentRequest
    {
        public int ID { get; set; }
        public int StudentID { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public Student Student { get; set; }

    }
}