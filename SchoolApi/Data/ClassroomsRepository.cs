using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class ClassroomsRepository : IItemsRepository<Classroom,ClassroomParams>
    {
        private readonly SchoolDataContext _context;
        public ClassroomsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Classrooms 
        public async Task<PagedList<Classroom>> Get(ClassroomParams classroomParams)
        {
            var classrooms = _context.Classroom.AsQueryable();

            // Sorting Classrooms
            if (!string.IsNullOrEmpty(classroomParams.OrderBy))
            {
                switch (classroomParams.OrderBy)
                {
                    default:
                        classrooms = classrooms.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Classrooms  
            if (!string.IsNullOrEmpty(classroomParams.SearchBy))
            {
                switch (classroomParams.SearchBy)
                {
                    default :
                        break;
                }
            }

            return await PagedList<Classroom>.CreateAsync(classrooms, classroomParams.PageNumber, classroomParams.PageSize);
        }
    }


    
}