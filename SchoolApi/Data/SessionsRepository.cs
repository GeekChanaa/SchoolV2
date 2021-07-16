using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class SessionsRepository : IItemsRepository<Session,SessionParams>
    {
        private readonly SchoolDataContext _context;
        public SessionsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Session
        public async Task<PagedList<Session>> Get(SessionParams sessionParams)
        {
            var sessions = _context.Session.AsQueryable();

            // Sorting Session
            if (!string.IsNullOrEmpty(sessionParams.OrderBy))
            {
                switch (sessionParams.OrderBy)
                {
                    default:
                        sessions = sessions.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Session 
            if (!string.IsNullOrEmpty(sessionParams.SearchBy))
            {
                switch (sessionParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Session>.CreateAsync(sessions, sessionParams.PageNumber, sessionParams.PageSize);
        }
    }

    
}