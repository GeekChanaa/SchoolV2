using System.ComponentModel.DataAnnotations;

namespace SchoolApi.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        public string Email {get; set;}
        [Required]
        public string Password { get; set; }
    }
}