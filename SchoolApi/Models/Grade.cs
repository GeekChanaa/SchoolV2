namespace SchoolApi.Models
{
    public class Grade
    {
        public int ID { get; set; }
        public float Value { get; set; }
        public int SubModuleID { get; set; }
        public int StudentID { get; set; }
        public Student Student { get; set; }
        public SubModule SubModule { get; set; }
    }
}