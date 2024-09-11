using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity;

namespace hsm_lab1.Controllers
{
    // AdminController.cs
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly UserManager<User> _userManager;

        public DashboardController(HospitalDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get logged-in doctor's reservations
        [HttpGet("doctor/reservations")]
        [Authorize(Roles = "doktor,patient")]
        public async Task<IActionResult> GetDoctorReservations()
        {
            var userId = _userManager.GetUserId(User);
            var doctor = await _context.Doktori.FirstOrDefaultAsync(d => d.UserId == userId);

            if (doctor == null)
                return NotFound("Doctor not found");

            var reservations = await _context.ReservationModel
                .Where(r => r.Doctor == doctor.Id)
                .ToListAsync();

            return Ok(reservations);
        }

        // Get logged-in doctor's records
        [HttpGet("doctor/records")]
        [Authorize(Roles = "doktor")]
        public async Task<IActionResult> GetDoctorRecords()
        {
            var userId = _userManager.GetUserId(User);
            var doctor = await _context.Doktori.FirstOrDefaultAsync(d => d.UserId == userId);

            if (doctor == null)
                return NotFound("Doctor not found");

            var records = await _context.Rekord
                .Where(r => r.DoctorId == doctor.Id)
                .ToListAsync();

            return Ok(records);
        }
        // Get nurses for each day of the week\

        [HttpPost("doctor/records")]
        [Authorize(Roles = "doktor")]
        public async Task<IActionResult> AddRecord([FromBody] RekordModel newRecord)
        {
            if (newRecord == null)
            {
                return BadRequest("Record data is required.");
            }
            // Check if all required fields are provided
            if (string.IsNullOrEmpty(newRecord.Diagnoza) ||
                string.IsNullOrEmpty(newRecord.Receta) ||
                string.IsNullOrEmpty(newRecord.Rezultatet) ||
                newRecord.Id_P <= 0)
            {
                return BadRequest("Please provide all required fields: Diagnoza, Receta, Rezultatet, and Id_P.");
            }

            // Set the doctor ID automatically
            var userId = _userManager.GetUserId(User);
            var doctor = await _context.Doktori.FirstOrDefaultAsync(d => d.UserId == userId);

            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            // Set the DoctorId for the new record
            newRecord.DoctorId = doctor.Id;

            // Add the new record to the database
            _context.Rekord.Add(newRecord);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle database update exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            // Return a 201 Created response with the location of the newly created resource
            return CreatedAtAction(nameof(GetDoctorRecords), new { id = newRecord.Id_Rek }, newRecord);
        }

        [HttpGet("doctor/nurses")]
        [Authorize(Roles = "doktor")]
        public async Task<IActionResult> GetNursesForWeek()
        {
            var nurses = await _context.Infermjeri
                .Select(n => new
                {
                    n.Id_i,
                    n.Emri,
                    n.Mbiemri,
                    n.Departamenti,
                    n.Email,
                    n.NumriTel,
                    Day = (n.Id_i % 7)  // Assuming nurses are assigned to days in a cyclic manner
                })
                .ToListAsync();

            var nursesByDay = new Dictionary<string, List<object>>
    {
        { "Monday", nurses.Where(n => n.Day == 1).Select(n => (object)n).ToList() },
        { "Tuesday", nurses.Where(n => n.Day == 2).Select(n => (object)n).ToList() },
        { "Wednesday", nurses.Where(n => n.Day == 3).Select(n => (object)n).ToList() },
        { "Thursday", nurses.Where(n => n.Day == 4).Select(n => (object)n).ToList() },
        { "Friday", nurses.Where(n => n.Day == 5).Select(n => (object)n).ToList() },
        { "Saturday", nurses.Where(n => n.Day == 6).Select(n => (object)n).ToList() },
        { "Sunday", nurses.Where(n => n.Day == 0).Select(n => (object)n).ToList() }
    };

            return Ok(nursesByDay);
        }



        // Get logged-in patient's reservations
        [HttpGet("patient/reservations")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> GetPatientReservations()
        {
            var userId = _userManager.GetUserId(User);
            var patient = await _context.Pacienti.FirstOrDefaultAsync(p => p.UserId == userId);

            if (patient == null)
                return NotFound("Patient not found");

            var reservations = await _context.ReservationModel
                .Where(r => r.Patient == patient.Id_P)
                .ToListAsync();

            return Ok(reservations);
        }

        [HttpPost("patient/reservations")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationModel request)
        {
            var userId = _userManager.GetUserId(User);
            var patient = await _context.Pacienti.FirstOrDefaultAsync(p => p.UserId == userId);

            if (patient == null)
                return NotFound("Patient not found");

            // Find the doctor by name
            var doctor = await _context.Doktori.FirstOrDefaultAsync(d => d.Id == request.Doctor); // Adjust property name if needed

            if (doctor == null)
                return NotFound("Doctor not found");

            var reservation = new ReservationModel
            {
                ReservationDate = request.ReservationDate,
                ReservationTime = request.ReservationTime,
                Patient = patient.Id_P,
                Doctor = doctor.Id // Adjust the property name if needed
            };

            _context.ReservationModel.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatientReservations), new { id = reservation.ReservationId }, reservation);
        }


        // Get logged-in patient's records
        [HttpGet("patient/records")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> GetPatientRecords()
        {
            var userId = _userManager.GetUserId(User);
            var patient = await _context.Pacienti.FirstOrDefaultAsync(p => p.UserId == userId);

            if (patient == null)
                return NotFound("Patient not found");

            var records = await _context.Rekord
                .Where(r => r.Id_P == patient.Id_P)
                .ToListAsync();

            return Ok(records);
        }


        // Additional endpoints can be added here for other functionalities
    }
}
