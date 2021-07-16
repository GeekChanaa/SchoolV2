using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class CitiesRepository : IItemsRepository<City,CityParams>
    {
        private readonly SchoolDataContext _context;
        public CitiesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Cities
        public async Task<PagedList<City>> Get(CityParams cityParams)
        {
            var cities = _context.City.AsQueryable();

            // Sorting Cities
            if (!string.IsNullOrEmpty(cityParams.OrderBy))
            {
                switch (cityParams.OrderBy)
                {
                    case "name":
                        cities = cityParams.ReverseOrder == "y" ? cities.OrderByDescending(c => c.Name) : cities.OrderBy(c => c.Name);
                        break;
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Cities 
            if (!string.IsNullOrEmpty(cityParams.SearchBy))
            {
                switch (cityParams.SearchBy)
                {
                    case "name":
                        cities = cities.Where(c => EF.Functions.Like(c.Name, "%"+cityParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<City>.CreateAsync(cities, cityParams.PageNumber, cityParams.PageSize);
        }
    }

    
}