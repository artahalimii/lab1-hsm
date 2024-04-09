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
    public class DoktoriModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public DoktoriModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/DoktoriModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoktoriModel>>> GetDoktori()
        {
          if (_context.Doktori == null)
          {
              return NotFound();
          }
            return await _context.Doktori.ToListAsync();
        }

        // GET: api/DoktoriModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoktoriModel>> GetDoktoriModel(int id)
        {
          if (_context.Doktori == null)
          {
              return NotFound();
          }
            var doktoriModel = await _context.Doktori.FindAsync(id);

            if (doktoriModel == null)
            {
                return NotFound();
            }

            return doktoriModel;
        }

        // PUT: api/DoktoriModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoktoriModel(int id, DoktoriModel doktoriModel)
        {
            if (id != doktoriModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(doktoriModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoktoriModelExists(id))
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

        // POST: api/DoktoriModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DoktoriModel>> PostDoktoriModel(DoktoriModel doktoriModel)
        {
          if (_context.Doktori == null)
          {
              return Problem("Entity set 'HospitalDbContext.Doktori'  is null.");
          }
            _context.Doktori.Add(doktoriModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoktoriModel", new { id = doktoriModel.Id }, doktoriModel);
        }

        // DELETE: api/DoktoriModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoktoriModel(int id)
        {
            if (_context.Doktori == null)
            {
                return NotFound();
            }
            var doktoriModel = await _context.Doktori.FindAsync(id);
            if (doktoriModel == null)
            {
                return NotFound();
            }

            _context.Doktori.Remove(doktoriModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoktoriModelExists(int id)
        {
            return (_context.Doktori?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
