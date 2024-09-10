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
        [Authorize(Roles = "doktor")]
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
        // Get nurses for each day of the week
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
