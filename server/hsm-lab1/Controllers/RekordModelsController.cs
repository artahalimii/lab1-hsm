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
    
    public class RekordModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public RekordModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/RekordModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RekordModel>>> GetRekords()
        {
            var rekords = await _context.Rekord
                                    .Include(r => r.Doktori) // Include doctor data
                                    .Include(r => r.Pacienti) // Include patient data
                                    .ToListAsync();

            if (rekords == null || !rekords.Any())
            {
                return NotFound();
            }

            return rekords;
        }


        // GET: api/RekordModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RekordModel>> GetRekordModel(int id)
        {
            var rekordModel = await _context.Rekord
                                            .Include(r => r.Doktori)
                                            .Include(r => r.Pacienti)
                                            .FirstOrDefaultAsync(r => r.Id_Rek == id);

            if (rekordModel == null)
            {
                return NotFound();
            }

            return rekordModel;
        }


        // PUT: api/RekordModels/
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRekordModel(int id, RekordModel rekordModel)
        {
            if (id != rekordModel.Id_Rek)
            {
                return BadRequest();
            }

            // Find the doctor based on the provided ID
            var doctor = await _context.Doktori.FindAsync(rekordModel.DoctorId);
            if (doctor == null)
            {
                // If DoctorId doesn't exist, return 404 Not Found
                return NotFound("Doctor not found.");
            }

            // Find the patient based on the provided ID
            var patient = await _context.Pacienti.FindAsync(rekordModel.Id_P);
            if (patient == null)
            {
                // If PatientId doesn't exist, return 404 Not Found
                return NotFound("Patient not found.");
            }

            // Update the related doctor and patient properties of the rekordModel
            rekordModel.Doktori = doctor;
            rekordModel.Pacienti = patient;

            // Set the state of the entity to modified
            _context.Entry(rekordModel).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RekordModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return a response indicating success with no content
            return NoContent();
        }


        // POST: api/RekordModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RekordModel>> PostRekordModel(RekordModel rekordModel)
        {
            if (_context.Rekord == null)
            {
                return Problem("Entity set 'HospitalDbContext.Rekords'  is null.");
            }

            var doctor = await _context.Doktori.FindAsync(rekordModel.DoctorId);
            if (doctor == null)
            {
                // If DoctorId doesn't exist, return 404 Not Found
                return NotFound("Doctor not found.");
            }

            // Check if the Id_P (PatientId) exists
            var patient = await _context.Pacienti.FindAsync(rekordModel.Id_P);
            if (patient == null)
            {
                // If Id_P (PatientId) doesn't exist, return 404 Not Found
                return NotFound("Patient not found.");
            }

            rekordModel.Pacienti = patient;
            rekordModel.Doktori = doctor;

            _context.Rekord.Add(rekordModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRekordModel", new { id = rekordModel.Id_Rek }, rekordModel);
        }

        // DELETE: api/RekordModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRekordModel(int id)
        {
            var rekordModel = await _context.Rekord
                                            .Include(r => r.Doktori) // Include doctor data
                                            .Include(r => r.Pacienti) // Include patient data
                                            .FirstOrDefaultAsync(r => r.Id_Rek == id);

            if (rekordModel == null)
            {
                return NotFound();
            }

            _context.Rekord.Remove(rekordModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RekordModelExists(int id)
        {
            return (_context.Rekord?.Any(e => e.Id_Rek == id)).GetValueOrDefault();
        }
    }
}
