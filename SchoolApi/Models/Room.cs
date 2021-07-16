using System;

namespace SchoolApi.Models
{
    public class Room
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int SchoolID { get; set; }
        public School School { get; set; }
    }
}