using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity;

namespace hsm_lab1.Controllers
{
    // AdminController.cs
    [Authorize(Roles = "doktor")]
    [Route("api/doctor-dashboard")]
    public class DoctorDashboardController : ControllerBase
    {
        private readonly HospitalDbContext _context;
        private readonly UserManager<User> _userManager;

        public DoctorDashboardController(HospitalDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get logged-in doctor's reservations
        [HttpGet("reservations")]
        public async Task<IActionResult> GetReservations()
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
        [HttpGet("records")]
        public async Task<IActionResult> GetRecords()
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

        // Get logged-in doctor's patients
        
    }

}
