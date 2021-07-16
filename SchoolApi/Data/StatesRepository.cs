using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class StatesRepository : IItemsRepository<State,StateParams>
    {
        private readonly SchoolDataContext _context;
        public StatesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of State
        public async Task<PagedList<State>> Get(StateParams stateParams)
        {
            var states = _context.State.AsQueryable();

            // Sorting State
            if (!string.IsNullOrEmpty(stateParams.OrderBy))
            {
                switch (stateParams.OrderBy)
                {
                    case "name":
                        states = stateParams.ReverseOrder == "y" ? states.OrderByDescending(c => c.Name) : states.OrderBy(c => c.Name);
                        break;
                    default:
                        states = states.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering State 
            if (!string.IsNullOrEmpty(stateParams.SearchBy))
            {
                switch (stateParams.SearchBy)
                {
                    case "name":
                        states = states.Where(c => EF.Functions.Like(c.Name, "%"+stateParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<State>.CreateAsync(states, stateParams.PageNumber, stateParams.PageSize);
        }
    }

    
}