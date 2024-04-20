using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;

namespace hsm_lab1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecepsionistiModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public RecepsionistiModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/RecepsionistiModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecepsionistiModel>>> GetRecepsionisti()
        {
          if (_context.Recepsionisti == null)
          {
              return NotFound();
          }
            return await _context.Recepsionisti.ToListAsync();
        }

        // GET: api/RecepsionistiModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecepsionistiModel>> GetRecepsionistiModel(int id)
        {
          if (_context.Recepsionisti == null)
          {
              return NotFound();
          }
            var recepsionistiModel = await _context.Recepsionisti.FindAsync(id);

            if (recepsionistiModel == null)
            {
                return NotFound();
            }

            return recepsionistiModel;
        }

        // PUT: api/RecepsionistiModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecepsionistiModel(int id, RecepsionistiModel recepsionistiModel)
        {
            if (id != recepsionistiModel.Id_r)
            {
                return BadRequest();
            }

            _context.Entry(recepsionistiModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecepsionistiModelExists(id))
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

        // POST: api/RecepsionistiModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecepsionistiModel>> PostRecepsionistiModel(RecepsionistiModel recepsionistiModel)
        {
          if (_context.Recepsionisti == null)
          {
              return Problem("Entity set 'HospitalDbContext.Recepsionisti'  is null.");
          }
            _context.Recepsionisti.Add(recepsionistiModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecepsionistiModel", new { id = recepsionistiModel.Id_r }, recepsionistiModel);
        }

        // DELETE: api/RecepsionistiModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecepsionistiModel(int id)
        {
            if (_context.Recepsionisti == null)
            {
                return NotFound();
            }
            var recepsionistiModel = await _context.Recepsionisti.FindAsync(id);
            if (recepsionistiModel == null)
            {
                return NotFound();
            }

            _context.Recepsionisti.Remove(recepsionistiModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecepsionistiModelExists(int id)
        {
            return (_context.Recepsionisti?.Any(e => e.Id_r == id)).GetValueOrDefault();
        }
    }
}
