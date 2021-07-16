using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class RoomsRepository : IItemsRepository<Room,RoomParams>
    {
        private readonly SchoolDataContext _context;
        public RoomsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Cities
        public async Task<PagedList<Room>> Get(RoomParams cityParams)
        {
            var cities = _context.Room.AsQueryable();

            // Sorting Cities
            if (!string.IsNullOrEmpty(cityParams.OrderBy))
            {
                switch (cityParams.OrderBy)
                {
                    case "name":
                        cities = cityParams.ReverseOrder == "y" ? cities.OrderByDescending(c => c.Name) : cities.OrderBy(c => c.Name);
                        break;
                    default:
                        cities = cities.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Cities 
            if (!string.IsNullOrEmpty(cityParams.SearchBy))
            {
                switch (cityParams.SearchBy)
                {
                    case "name":
                        cities = cities.Where(c => EF.Functions.Like(c.Name, "%"+cityParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Room>.CreateAsync(cities, cityParams.PageNumber, cityParams.PageSize);
        }
    }

    
}