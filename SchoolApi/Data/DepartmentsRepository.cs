using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class DepartmentsRepository : IItemsRepository<Department,DepartmentParams>
    {
        private readonly SchoolDataContext _context;
        public DepartmentsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Department
        public async Task<PagedList<Department>> Get(DepartmentParams departmentParams)
        {
            var departments = _context.Department.AsQueryable();

            // Sorting Department
            if (!string.IsNullOrEmpty(departmentParams.OrderBy))
            {
                switch (departmentParams.OrderBy)
                {
                    case "name":
                        departments = departmentParams.ReverseOrder == "y" ? departments.OrderByDescending(c => c.Name) : departments.OrderBy(c => c.Name);
                        break;
                    default:
                        departments = departments.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Department 
            if (!string.IsNullOrEmpty(departmentParams.SearchBy))
            {
                switch (departmentParams.SearchBy)
                {
                    case "name":
                        departments = departments.Where(c => EF.Functions.Like(c.Name, "%"+departmentParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Department>.CreateAsync(departments, departmentParams.PageNumber, departmentParams.PageSize);
        }
    }

    
}