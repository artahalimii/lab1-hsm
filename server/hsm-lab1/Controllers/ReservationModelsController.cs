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
    public class ReservationModelsController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public ReservationModelsController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: api/ReservationModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationModel>>> GetReservations()
        {
            var reservations = await _context.ReservationModel
                                             .Include(r => r.DoctorNavigation) // Include doctor data
                                             .Include(r => r.PatientNavigation) // Include patient data
                                             .ToListAsync();

            if (reservations == null || !reservations.Any())
            {
                return NotFound();
            }

            return reservations;
        }

        // GET: api/ReservationModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationModel>> GetReservationModel(int id)
        {
            var reservationModel = await _context.ReservationModel
                                                 .Include(r => r.DoctorNavigation)
                                                 .Include(r => r.PatientNavigation)
                                                 .FirstOrDefaultAsync(r => r.ReservationId == id);

            if (reservationModel == null)
            {
                return NotFound();
            }

            return reservationModel;
        }

        // PUT: api/ReservationModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservationModel(int id, ReservationModel reservationModel)
        {
            if (id != reservationModel.ReservationId)
            {
                return BadRequest();
            }

            // Find the doctor based on the provided ID
            var doctor = await _context.Doktori.FindAsync(reservationModel.Doctor);
            if (doctor == null)
            {
                // If DoctorId doesn't exist, return 404 Not Found
                return NotFound("Doctor not found.");
            }

            // Find the patient based on the provided ID
            var patient = await _context.Pacienti.FindAsync(reservationModel.Patient);
            if (patient == null)
            {
                // If PatientId doesn't exist, return 404 Not Found
                return NotFound("Patient not found.");
            }

            // Update the related doctor and patient properties of the reservationModel
            reservationModel.DoctorNavigation = doctor;
            reservationModel.PatientNavigation = patient;

            // Set the state of the entity to modified
            _context.Entry(reservationModel).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationModelExists(id))
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

        // POST: api/ReservationModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReservationModel>> PostReservationModel(ReservationModel reservationModel)
        {
            if (_context.ReservationModel == null)
            {
                return Problem("Entity set 'HospitalDbContext.ReservationModel' is null.");
            }

            var doctor = await _context.Doktori.FindAsync(reservationModel.Doctor);
            if (doctor == null)
            {
                // If DoctorId doesn't exist, return 404 Not Found
                return NotFound("Doctor not found.");
            }

            var patient = await _context.Pacienti.FindAsync(reservationModel.Patient);
            if (patient == null)
            {
                // If PatientId doesn't exist, return 404 Not Found
                return NotFound("Patient not found.");
            }

            reservationModel.DoctorNavigation = doctor;
            reservationModel.PatientNavigation = patient;

            _context.ReservationModel.Add(reservationModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservationModel", new { id = reservationModel.ReservationId }, reservationModel);
        }

        // DELETE: api/ReservationModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservationModel(int id)
        {
            var reservationModel = await _context.ReservationModel
                                                 .Include(r => r.DoctorNavigation) // Include doctor data
                                                 .Include(r => r.PatientNavigation) // Include patient data
                                                 .FirstOrDefaultAsync(r => r.ReservationId == id);

            if (reservationModel == null)
            {
                return NotFound();
            }

            _context.ReservationModel.Remove(reservationModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationModelExists(int id)
        {
            return (_context.ReservationModel?.Any(e => e.ReservationId == id)).GetValueOrDefault();
        }
    }
}
