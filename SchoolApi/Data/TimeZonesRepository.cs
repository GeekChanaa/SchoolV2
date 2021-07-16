using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class TimezonesRepository : IItemsRepository<Timezone,TimezoneParams>
    {
        private readonly SchoolDataContext _context;
        public TimezonesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Cities
        public async Task<PagedList<Timezone>> Get(TimezoneParams timezoneParams)
        {
            var timezones = _context.Timezone.AsQueryable();

            // Sorting Cities
            if (!string.IsNullOrEmpty(timezoneParams.OrderBy))
            {
                switch (timezoneParams.OrderBy)
                {
                    default:
                        timezones = timezones.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Cities 
            if (!string.IsNullOrEmpty(timezoneParams.SearchBy))
            {
                switch (timezoneParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Timezone>.CreateAsync(timezones, timezoneParams.PageNumber, timezoneParams.PageSize);
        }
    }

    
}