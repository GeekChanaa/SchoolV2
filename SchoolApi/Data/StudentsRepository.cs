using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class StudentsRepository : IItemsRepository<Student,StudentParams>
    {
        private readonly SchoolDataContext _context;
        public StudentsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Students
        public async Task<PagedList<Student>> Get(StudentParams studentParams)
        {
            var students = _context.Student.AsQueryable();

            // Sorting Students
            if (!string.IsNullOrEmpty(studentParams.OrderBy))
            {
                switch (studentParams.OrderBy)
                {
                    default:
                        students = students.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Students 
            if (!string.IsNullOrEmpty(studentParams.SearchBy))
            {
                switch (studentParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Student>.CreateAsync(students, studentParams.PageNumber, studentParams.PageSize);
        }
    }

    
}