namespace SchoolApi.Models
{
    public class Mail
    {
        public int ID { get; set; }
        public int ReceiverID { get; set; }
        public int SenderID { get; set; }
        public string Subject { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public User Receiver { get; set; }
        public User Sender { get; set; }
    }
}