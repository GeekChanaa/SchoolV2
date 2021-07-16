using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class TranslationsRepository : IItemsRepository<Translation,TranslationParams>
    {
        private readonly SchoolDataContext _context;
        public TranslationsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Translation
        public async Task<PagedList<Translation>> Get(TranslationParams cityParams)
        {
            var cities = _context.Translation.AsQueryable();

            // Sorting Translation
            if (!string.IsNullOrEmpty(cityParams.OrderBy))
            {
                switch (cityParams.OrderBy)
                {
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Translation 
            if (!string.IsNullOrEmpty(cityParams.SearchBy))
            {
                switch (cityParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Translation>.CreateAsync(cities, cityParams.PageNumber, cityParams.PageSize);
        }
    }

    
}