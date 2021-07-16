using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class AbsenceJustificationsRepository : IItemsRepository<AbsenceJustification,AbsenceJustificationParams>
    {
        private readonly SchoolDataContext _context;
        public AbsenceJustificationsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of AbsenceJustifications
        public async Task<PagedList<AbsenceJustification>> Get(AbsenceJustificationParams cityParams)
        {
            var absenceJustifications = _context.AbsenceJustification.AsQueryable();

            // Sorting AbsenceJustifications
            if (!string.IsNullOrEmpty(cityParams.OrderBy))
            {
                switch (cityParams.OrderBy)
                {
                    
                    default:
                        absenceJustifications = absenceJustifications.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering AbsenceJustifications 
            if (!string.IsNullOrEmpty(cityParams.SearchBy))
            {
                switch (cityParams.SearchBy)
                {
                    
                    default :
                        break;
                }
            }

            return await PagedList<AbsenceJustification>.CreateAsync(absenceJustifications, cityParams.PageNumber, cityParams.PageSize);
        }
    }

    
}