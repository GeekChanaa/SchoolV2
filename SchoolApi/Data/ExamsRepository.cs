using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class ExamsRepository : IItemsRepository<Exam,ExamParams>
    {
        private readonly SchoolDataContext _context;
        public ExamsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Exams
        public async Task<PagedList<Exam>> Get(ExamParams examParams)
        {
            var exams = _context.Exam.AsQueryable();

            // Sorting Exams
            if (!string.IsNullOrEmpty(examParams.OrderBy))
            {
                switch (examParams.OrderBy)
                {
                    default:
                        exams = exams.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Exams 
            if (!string.IsNullOrEmpty(examParams.SearchBy))
            {
                switch (examParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Exam>.CreateAsync(exams, examParams.PageNumber, examParams.PageSize);
        }
    }

    
}