namespace SchoolApi.Models
{
    public class SubModule
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ModuleID { get; set; }
        public Module Module { get; set; }
    }
}