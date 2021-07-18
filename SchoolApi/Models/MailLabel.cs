namespace SchoolApi.Models
{
    public class MailLabel
    {
        public int ID { get; set; }
        public int MailID { get; set; }
        public int LabelID { get; set; }
        public Mail Mail { get; set; }
        public Label Label { get; set; }
    }
}