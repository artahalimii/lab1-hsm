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
    public class InfermjeriModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public

InfermjeriModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/InfermjeriModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfermjeriModel>>> GetInfermjeri()
        {
            if (_context.Infermjeri == null)
            {
                return NotFound();
            }
            return await _context.Infermjeri.ToListAsync();
        }

        // GET: api/InfermjeriModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InfermjeriModel>> GetInfermjeriModel(int id)
        {
            if (_context.Infermjeri == null)
            {
                return NotFound();
            }
            var InfermjeriModel = await _context.Infermjeri.FindAsync(id);

            if (InfermjeriModel == null)
            {
                return NotFound();
            }

            return InfermjeriModel;
        }

        // PUT: api/InfermjeriModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInfermjeriModel(int id, InfermjeriModel InfermjeriModel)
        {
            if (id != InfermjeriModel.Id_i)
            {
                return BadRequest();
            }

            _context.Entry(InfermjeriModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InfermjeriModelExists(id))
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

        // POST: api/InfermjeriModels
        [HttpPost]
        public async Task<ActionResult<InfermjeriModel>> PostInfermjeriModel(InfermjeriModel InfermjeriModel)
        {
            if (_context.Infermjeri == null)
            {
                return Problem("Entity set 'HospitalDbContext.Infermjeri'  is null.");
            }
            _context.Infermjeri.Add(InfermjeriModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInfermjeriModel", new { id = InfermjeriModel.Id_i }, InfermjeriModel);
        }

        // DELETE: api/InfermjeriModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfermjeriModel(int id)
        {
            if (_context.Infermjeri == null)
            {
                return NotFound();
            }
            var InfermjeriModel = await _context.Infermjeri.FindAsync(id);
            if (InfermjeriModel == null)
            {
                return NotFound();
            }

            _context.Infermjeri.Remove(InfermjeriModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InfermjeriModelExists(int id)
        {
            return (_context.Infermjeri?.Any(e => e.Id_i == id)).GetValueOrDefault();
        }
    }
}
