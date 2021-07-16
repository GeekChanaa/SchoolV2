using System.Threading.Tasks;
using SchoolApi.Models;

namespace SchoolApi.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string login);
        Task<bool> UserExists(string email);
        Task<User> GetUser(int id);
        
    }
}