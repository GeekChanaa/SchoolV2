using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class UsersRepository : IItemsRepository<User,UserParams>
    {
        private readonly SchoolDataContext _context;
        public UsersRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of User
        public async Task<PagedList<User>> Get(UserParams cityParams)
        {
            var users = _context.User.AsQueryable();

            // Sorting User
            if (!string.IsNullOrEmpty(cityParams.OrderBy))
            {
                switch (cityParams.OrderBy)
                {
                    default:
                        users = users.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering User 
            if (!string.IsNullOrEmpty(cityParams.SearchBy))
            {
                switch (cityParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, cityParams.PageNumber, cityParams.PageSize);
        }
    }

    
}