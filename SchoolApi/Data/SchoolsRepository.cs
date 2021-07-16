using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class SchoolsRepository : IItemsRepository<School,SchoolParams>
    {
        private readonly SchoolDataContext _context;
        public SchoolsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Schools
        public async Task<PagedList<School>> Get(SchoolParams schoolParams)
        {
            var cities = _context.School.AsQueryable();

            // Sorting Schools
            if (!string.IsNullOrEmpty(schoolParams.OrderBy))
            {
                switch (schoolParams.OrderBy)
                {
                    case "name":
                        cities = schoolParams.ReverseOrder == "y" ? cities.OrderByDescending(c => c.Name) : cities.OrderBy(c => c.Name);
                        break;
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Schools 
            if (!string.IsNullOrEmpty(schoolParams.SearchBy))
            {
                switch (schoolParams.SearchBy)
                {
                    case "name":
                        cities = cities.Where(c => EF.Functions.Like(c.Name, "%"+schoolParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<School>.CreateAsync(cities, schoolParams.PageNumber, schoolParams.PageSize);
        }
    }

    
}