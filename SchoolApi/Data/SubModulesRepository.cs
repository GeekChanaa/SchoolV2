using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class SubModulesRepository : IItemsRepository<SubModule,SubModuleParams>
    {
        private readonly SchoolDataContext _context;
        public SubModulesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of SubModule
        public async Task<PagedList<SubModule>> Get(SubModuleParams subModuleParams)
        {
            var subModules = _context.SubModule.AsQueryable();

            // Sorting SubModule
            if (!string.IsNullOrEmpty(subModuleParams.OrderBy))
            {
                switch (subModuleParams.OrderBy)
                {
                    case "name":
                        subModules = subModuleParams.ReverseOrder == "y" ? subModules.OrderByDescending(c => c.Name) : subModules.OrderBy(c => c.Name);
                        break;
                    default:
                        subModules = subModules.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering SubModule 
            if (!string.IsNullOrEmpty(subModuleParams.SearchBy))
            {
                switch (subModuleParams.SearchBy)
                {
                    case "name":
                        subModules = subModules.Where(c => EF.Functions.Like(c.Name, "%"+subModuleParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<SubModule>.CreateAsync(subModules, subModuleParams.PageNumber, subModuleParams.PageSize);
        }
    }

    
}