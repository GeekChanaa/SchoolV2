
using System;

namespace SchoolApi.Models
{
    public class User
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    
        // Salting the hashed password is one of the most secured ways to secure passwords
        public  byte[] PasswordHash { get; set; }
        public  byte[] PasswordSalt { get; set; }
        
    }
}