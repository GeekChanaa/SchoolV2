using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class AssignmentsRepository : IItemsRepository<Assignment,AssignmentParams>
    {
        private readonly SchoolDataContext _context;
        public AssignmentsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Assignments
        public async Task<PagedList<Assignment>> Get(AssignmentParams absenceJustificationParams)
        {
            var assignments = _context.Assignment.AsQueryable();

            // Sorting Assignments
            if (!string.IsNullOrEmpty(absenceJustificationParams.OrderBy))
            {
                switch (absenceJustificationParams.OrderBy)
                {
                    
                    default:
                        assignments = assignments.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Assignments 
            if (!string.IsNullOrEmpty(absenceJustificationParams.SearchBy))
            {
                switch (absenceJustificationParams.SearchBy)
                {
                    
                    default :
                        break;
                }
            }

            return await PagedList<Assignment>.CreateAsync(assignments, absenceJustificationParams.PageNumber, absenceJustificationParams.PageSize);
        }
    }

    
}