using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
// Only relevant parts are shown
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace hsm_lab1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class PacientiModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly UserManager<User> _userManager;

        public PacientiModelsController(HospitalDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

       

        // GET: api/PacientiModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PacientiModel>>> GetPacienti()
        {
            if (_context.Pacienti == null)
            {
                return NotFound();
            }
            return await _context.Pacienti.ToListAsync();
        }

 // POST: api/PacientiModels
        [HttpPost]
        public async Task<ActionResult<PacientiModel>> PostPacientiModel(PacientiModel pacientiModel)
        {
            if (_context.Pacienti == null)
            {
                return Problem("Entity set 'HospitalDbContext.Pacienti' is null.");
            }

            // Check if user exists by UserId
            if (!string.IsNullOrEmpty(pacientiModel.UserId))
            {
                var user = await _userManager.FindByIdAsync(pacientiModel.UserId);
                if (user == null)
                {
                    return BadRequest("User with specified UserId does not exist.");
                }
            }
            else
            {
                return BadRequest("UserId is required.");
            }

            _context.Pacienti.Add(pacientiModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPacientiModel", new { id = pacientiModel.Id_P }, pacientiModel);
        }
        // GET: api/PacientiModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PacientiModel>> GetPacientiModel(int id)
        {
            if (_context.Pacienti == null)
            {
                return NotFound();
            }
            var pacientiModel = await _context.Pacienti.FindAsync(id);

            if (pacientiModel == null)
            {
                return NotFound();
            }

            return pacientiModel;
        }

        // PUT: api/PacientiModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPacientiModel(int id, PacientiModel pacientiModel)
        {
            if (id != pacientiModel.Id_P)
            {
                return BadRequest();
            }

            _context.Entry(pacientiModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacientiModelExists(id))
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

        // POST: api/PacientiModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // DELETE: api/PacientiModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePacientiModel(int id)
        {
            if (_context.Pacienti == null)
            {
                return NotFound();
            }
            var pacientiModel = await _context.Pacienti.FindAsync(id);
            if (pacientiModel == null)
            {
                return NotFound();
            }

            _context.Pacienti.Remove(pacientiModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PacientiModelExists(int id)
        {
            return (_context.Pacienti?.Any(e => e.Id_P == id)).GetValueOrDefault();
        }
    }
}