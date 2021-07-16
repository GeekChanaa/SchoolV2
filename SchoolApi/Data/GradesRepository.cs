using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class GradesRepository : IItemsRepository<Grade,GradeParams>
    {
        private readonly SchoolDataContext _context;
        public GradesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Grade
        public async Task<PagedList<Grade>> Get(GradeParams gradeParams)
        {
            var grades = _context.Grade.AsQueryable();

            // Sorting Grade
            if (!string.IsNullOrEmpty(gradeParams.OrderBy))
            {
                switch (gradeParams.OrderBy)
                {
                    default:
                        grades = grades.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Grade 
            if (!string.IsNullOrEmpty(gradeParams.SearchBy))
            {
                switch (gradeParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Grade>.CreateAsync(grades, gradeParams.PageNumber, gradeParams.PageSize);
        }
    }

    
}