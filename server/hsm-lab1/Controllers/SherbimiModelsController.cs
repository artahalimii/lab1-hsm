using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Authorization;

namespace hsm_lab1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class SherbimiModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public SherbimiModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/SherbimiModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SherbimiModel>>> GetSherbimi()
        {
          if (_context.Sherbimi == null)
          {
              return NotFound();
          }
            return await _context.Sherbimi.ToListAsync();
        }

        // GET: api/SherbimiModels/5
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<ActionResult<SherbimiModel>> GetSherbimiModel(int id)
        {
          if (_context.Sherbimi == null)
          {
              return NotFound();
          }
            var sherbimiModel = await _context.Sherbimi.FindAsync(id);

            if (sherbimiModel == null)
            {
                return NotFound();
            }

            return sherbimiModel;
        }

        // PUT: api/SherbimiModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]

        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutSherbimiModel(int id, SherbimiModel sherbimiModel)
        {
            if (id != sherbimiModel.Id_S)
            {
                return BadRequest();
            }

            _context.Entry(sherbimiModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SherbimiModelExists(id))
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
        // POST: api/SherbimiModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<SherbimiModel>> PostSherbimiModel(SherbimiModel sherbimiModel)
        {
          if (_context.Sherbimi == null)
          {
              return Problem("Entity set 'HospitalDbContext.Sherbimi'  is null.");
          }
            _context.Sherbimi.Add(sherbimiModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSherbimiModel", new { id = sherbimiModel.Id_S }, sherbimiModel);
        }

        // DELETE: api/SherbimiModels/5
        [HttpDelete("{id}")]

        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSherbimiModel(int id)
        {
            if (_context.Sherbimi == null)
            {
                return NotFound();
            }
            var sherbimiModel = await _context.Sherbimi.FindAsync(id);
            if (sherbimiModel == null)
            {
                return NotFound();
            }

            _context.Sherbimi.Remove(sherbimiModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SherbimiModelExists(int id)
        {
            return (_context.Sherbimi?.Any(e => e.Id_S == id)).GetValueOrDefault();
        }
    }
}
