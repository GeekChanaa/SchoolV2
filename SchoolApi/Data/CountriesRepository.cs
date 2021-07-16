using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class CountriesRepository : IItemsRepository<Country,CountryParams>
    {
        private readonly SchoolDataContext _context;
        public CountriesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Cities
        public async Task<PagedList<Country>> Get(CountryParams countryParams)
        {
            var countries = _context.Country.AsQueryable();

            // Sorting Cities
            if (!string.IsNullOrEmpty(countryParams.OrderBy))
            {
                switch (countryParams.OrderBy)
                {
                    case "name":
                        countries = countryParams.ReverseOrder == "y" ? countries.OrderByDescending(c => c.Name) : countries.OrderBy(c => c.Name);
                        break;
                    default:
                        countries = countries.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Cities 
            if (!string.IsNullOrEmpty(countryParams.SearchBy))
            {
                switch (countryParams.SearchBy)
                {
                    case "name":
                        countries = countries.Where(c => EF.Functions.Like(c.Name, "%"+countryParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Country>.CreateAsync(countries, countryParams.PageNumber, countryParams.PageSize);
        }
    }

    
}