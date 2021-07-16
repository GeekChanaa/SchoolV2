namespace SchoolApi.Models
{
    public class AbsenceJustification
    {
        public int ID { get; set; }
        public int AttendanceID { get; set; }
        public string Description { get; set; }
        public Attendance Attendance { get; set; }
    }
}