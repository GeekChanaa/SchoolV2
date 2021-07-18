using System;

namespace SchoolApi.Models
{
    public class Homework
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CourseID { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Course Course { get; set; }
    }
}