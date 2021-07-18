using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApi.Data;
using SchoolApi.Models;

using SchoolApi.Helpers;

namespace SchoolApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubModuleController : ControllerBase
    {
        private readonly SchoolDataContext _context;
        private readonly IItemsRepository<SubModule, SubModuleParams> _repo;

        public SubModuleController(SchoolDataContext context, IItemsRepository<SubModule, SubModuleParams> repo)
        {
            _context = context;
           _repo = repo;
        }

        // GET: api/SubModule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubModule>>> GetSubModule([FromQuery] SubModuleParams subModuleParams)
        {
            var subModules = await _repo.Get(subModuleParams);
            Response.AddPagination(subModules.CurrentPage,subModules.PageSize, subModules.TotalCount,subModules.TotalPages);
            return Ok(subModules);          }

        // GET: api/SubModule/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubModule>> GetSubModule(int id)
        {
            var subModule = await _context.SubModule.FindAsync(id);

            if (subModule == null)
            {
                return NotFound();
            }

            return subModule;
        }

        // PUT: api/SubModule/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubModule(int id, SubModule subModule)
        {
            if (id != subModule.ID)
            {
                return BadRequest();
            }

            _context.Entry(subModule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubModuleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SubModule
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubModule>> PostSubModule(SubModule subModule)
        {
            _context.SubModule.Add(subModule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubModule", new { id = subModule.ID }, subModule);
        }

        // DELETE: api/SubModule/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubModule(int id)
        {
            var subModule = await _context.SubModule.FindAsync(id);
            if (subModule == null)
            {
                return NotFound();
            }

            _context.SubModule.Remove(subModule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubModuleExists(int id)
        {
            return _context.SubModule.Any(e => e.ID == id);
        }
    }
}
