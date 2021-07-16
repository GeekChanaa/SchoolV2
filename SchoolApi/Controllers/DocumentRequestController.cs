using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApi.Data;
using SchoolApi.Models;

namespace SchoolApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentRequestController : ControllerBase
    {
        private readonly SchoolDataContext _context;

        public DocumentRequestController(SchoolDataContext context)
        {
            _context = context;
        }

        // GET: api/DocumentRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentRequest>>> GetDocumentRequest()
        {
            return await _context.DocumentRequest.ToListAsync();
        }

        // GET: api/DocumentRequest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentRequest>> GetDocumentRequest(int id)
        {
            var documentRequest = await _context.DocumentRequest.FindAsync(id);

            if (documentRequest == null)
            {
                return NotFound();
            }

            return documentRequest;
        }

        // PUT: api/DocumentRequest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocumentRequest(int id, DocumentRequest documentRequest)
        {
            if (id != documentRequest.ID)
            {
                return BadRequest();
            }

            _context.Entry(documentRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentRequestExists(id))
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

        // POST: api/DocumentRequest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DocumentRequest>> PostDocumentRequest(DocumentRequest documentRequest)
        {
            _context.DocumentRequest.Add(documentRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocumentRequest", new { id = documentRequest.ID }, documentRequest);
        }

        // DELETE: api/DocumentRequest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocumentRequest(int id)
        {
            var documentRequest = await _context.DocumentRequest.FindAsync(id);
            if (documentRequest == null)
            {
                return NotFound();
            }

            _context.DocumentRequest.Remove(documentRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DocumentRequestExists(int id)
        {
            return _context.DocumentRequest.Any(e => e.ID == id);
        }
    }
}
