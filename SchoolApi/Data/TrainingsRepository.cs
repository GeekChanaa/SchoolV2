using SchoolApi.Models;
using SchoolApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SchoolApi.Data
{
    public class TrainingsRepository : IItemsRepository<Training,TrainingParams>
    {
        private readonly SchoolDataContext _context;
        public TrainingsRepository(SchoolDataContext context)
        {
            _context = context;
        }

        // Getting PagedList of Training
        public async Task<PagedList<Training>> Get(TrainingParams trainingParams)
        {
            var trainings = _context.Training.AsQueryable();

            // Sorting Training
            if (!string.IsNullOrEmpty(trainingParams.OrderBy))
            {
                switch (trainingParams.OrderBy)
                {
                    case "name":
                        trainings = trainingParams.ReverseOrder == "y" ? trainings.OrderByDescending(c => c.Name) : trainings.OrderBy(c => c.Name);
                        break;
                    default:
                        trainings = trainings.OrderByDescending(c => c.ID);
                        break;
                }
            }

            // Filtering Training 
            if (!string.IsNullOrEmpty(trainingParams.SearchBy))
            {
                switch (trainingParams.SearchBy)
                {
                    case "name":
                        trainings = trainings.Where(c => EF.Functions.Like(c.Name, "%"+trainingParams.SearchValue+"%"));
                        break;
                    default :
                        break;
                }
            }

            return await PagedList<Training>.CreateAsync(trainings, trainingParams.PageNumber, trainingParams.PageSize);
        }
    }

    
}