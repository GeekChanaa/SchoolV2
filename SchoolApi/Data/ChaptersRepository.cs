using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class ChaptersRepository : IItemsRepository<Chapter,ChapterParams>
    {
        private readonly SchoolDataContext _context;
        public ChaptersRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Chapters
        public async Task<PagedList<Chapter>> Get(ChapterParams chapterParams)
        {
            var chapters = _context.Chapter.AsQueryable();

            // Sorting Chapters
            if (!string.IsNullOrEmpty(chapterParams.OrderBy))
            {
                switch (chapterParams.OrderBy)
                {
                    case "name":
                        chapters = chapterParams.ReverseOrder == "y" ? chapters.OrderByDescending(c => c.Name) : chapters.OrderBy(c => c.Name);
                        break;
                    default:
                        chapters = chapters.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Chapters 
            if (!string.IsNullOrEmpty(chapterParams.SearchBy))
            {
                switch (chapterParams.SearchBy)
                {
                    case "name":
                        chapters = chapters.Where(c => EF.Functions.Like(c.Name, "%"+chapterParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Chapter>.CreateAsync(chapters, chapterParams.PageNumber, chapterParams.PageSize);
        }
    }

    
}