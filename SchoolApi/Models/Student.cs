using System;

namespace SchoolApi.Models
{
    public class Student
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Sex { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string FatherPhone { get; set; }
        public string MotherPhone { get; set; }
        public string FatherProfession { get; set; }
        public string MotherProfession { get; set; }
        public string FatherPlaceOfWork { get; set; }
        public string MotherPlaceOfWork { get; set; }
        public User User { get; set; }
    }
}