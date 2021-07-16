using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class AttendancesRepository : IItemsRepository<Attendance,AttendanceParams>
    {
        private readonly SchoolDataContext _context;
        public AttendancesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Attendances
        public async Task<PagedList<Attendance>> Get(AttendanceParams attendanceParams)
        {
            var cities = _context.Attendance.AsQueryable();

            // Sorting Attendances
            if (!string.IsNullOrEmpty(attendanceParams.OrderBy))
            {
                switch (attendanceParams.OrderBy)
                {
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Attendances 
            if (!string.IsNullOrEmpty(attendanceParams.SearchBy))
            {
                switch (attendanceParams.SearchBy)
                {
                    
                    default :
                        break;
                }
            }

            return await PagedList<Attendance>.CreateAsync(cities, attendanceParams.PageNumber, attendanceParams.PageSize);
        }
    }

    
}