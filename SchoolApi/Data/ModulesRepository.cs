using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class ModulesRepository : IItemsRepository<Module,ModuleParams>
    {
        private readonly SchoolDataContext _context;
        public ModulesRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Module
        public async Task<PagedList<Module>> Get(ModuleParams moduleParams)
        {
            var modules = _context.Module.AsQueryable();

            // Sorting Module
            if (!string.IsNullOrEmpty(moduleParams.OrderBy))
            {
                switch (moduleParams.OrderBy)
                {
                    case "name":
                        modules = moduleParams.ReverseOrder == "y" ? modules.OrderByDescending(c => c.Name) : modules.OrderBy(c => c.Name);
                        break;
                    default:
                        modules = modules.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Module 
            if (!string.IsNullOrEmpty(moduleParams.SearchBy))
            {
                switch (moduleParams.SearchBy)
                {
                    case "name":
                        modules = modules.Where(c => EF.Functions.Like(c.Name, "%"+moduleParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Module>.CreateAsync(modules, moduleParams.PageNumber, moduleParams.PageSize);
        }
    }

    
}