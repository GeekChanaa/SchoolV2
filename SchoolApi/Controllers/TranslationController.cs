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
    public class TranslationController : ControllerBase
    {
        private readonly SchoolDataContext _context;
        private readonly IItemsRepository<Translation, TranslationParams> _repo;

        public TranslationController(SchoolDataContext context, IItemsRepository<Translation, TranslationParams> repo)
        {
            _context = context;
           _repo = repo;
        }

        // GET: api/Translation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Translation>>> GetTranslation([FromQuery] TranslationParams translationParams)
        {
            var translations = await _repo.Get(translationParams);
            Response.AddPagination(translations.CurrentPage,translations.PageSize, translations.TotalCount,translations.TotalPages);
            return Ok(translations);          }

        // GET: api/Translation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Translation>> GetTranslation(int id)
        {
            var translation = await _context.Translation.FindAsync(id);

            if (translation == null)
            {
                return NotFound();
            }

            return translation;
        }

        // PUT: api/Translation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranslation(int id, Translation translation)
        {
            if (id != translation.ID)
            {
                return BadRequest();
            }

            _context.Entry(translation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TranslationExists(id))
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

        // POST: api/Translation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Translation>> PostTranslation(Translation translation)
        {
            _context.Translation.Add(translation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTranslation", new { id = translation.ID }, translation);
        }

        // DELETE: api/Translation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranslation(int id)
        {
            var translation = await _context.Translation.FindAsync(id);
            if (translation == null)
            {
                return NotFound();
            }

            _context.Translation.Remove(translation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TranslationExists(int id)
        {
            return _context.Translation.Any(e => e.ID == id);
        }
    }
}
