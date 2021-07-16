using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class DocumentRequestsRepository : IItemsRepository<DocumentRequest,DocumentRequestParams>
    {
        private readonly SchoolDataContext _context;
        public DocumentRequestsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of DocumentRequest
        public async Task<PagedList<DocumentRequest>> Get(DocumentRequestParams documentRequestParams)
        {
            var cities = _context.DocumentRequest.AsQueryable();

            // Sorting DocumentRequest
            if (!string.IsNullOrEmpty(documentRequestParams.OrderBy))
            {
                switch (documentRequestParams.OrderBy)
                {
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering DocumentRequest 
            if (!string.IsNullOrEmpty(documentRequestParams.SearchBy))
            {
                switch (documentRequestParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<DocumentRequest>.CreateAsync(cities, documentRequestParams.PageNumber, documentRequestParams.PageSize);
        }
    }

    
}