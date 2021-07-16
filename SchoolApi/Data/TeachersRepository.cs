using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class TeachersRepository : IItemsRepository<Teacher,TeacherParams>
    {
        private readonly SchoolDataContext _context;
        public TeachersRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Teacher
        public async Task<PagedList<Teacher>> Get(TeacherParams teacherParams)
        {
            var teachers = _context.Teacher.AsQueryable();

            // Sorting Teacher
            if (!string.IsNullOrEmpty(teacherParams.OrderBy))
            {
                switch (teacherParams.OrderBy)
                {
                    default:
                        teachers = teachers.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Teacher 
            if (!string.IsNullOrEmpty(teacherParams.SearchBy))
            {
                switch (teacherParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Teacher>.CreateAsync(teachers, teacherParams.PageNumber, teacherParams.PageSize);
        }
    }

    
}