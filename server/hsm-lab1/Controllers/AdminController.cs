using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;

namespace hsm_lab1.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly HospitalDbContext _context;

        public AdminController(HospitalDbContext context)
        {
            _context = context;
        }

        // GET: Admin/Index
        public async Task<IActionResult> Index()
        {
            var numberOfDoctors = await _context.Doktori.CountAsync();
            var numberOfPatients = await _context.Pacienti.CountAsync();
            var numberOfReservations = await _context.ReservationModel.CountAsync();

            ViewData["NumberOfDoctors"] = numberOfDoctors;
            ViewData["NumberOfPatients"] = numberOfPatients;
            ViewData["NumberOfReservations"] = numberOfReservations;

            return View();
        }

        // DOCTOR ACTIONS
        // GET: Admin/Doctors
        public async Task<IActionResult> Doctors()
        {
            var doctors = await _context.Doktori.ToListAsync();
            return View(doctors);
        }

        // GET: Admin/CreateDoctor
        public IActionResult CreateDoctor()
        {
            return View();
        }

        // POST: Admin/CreateDoctor
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateDoctor(DoktoriModel doctor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(doctor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Doctors));
            }
            return View(doctor);
        }

        // GET: Admin/EditDoctor/5
        public async Task<IActionResult> EditDoctor(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doktori.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }
            return View(doctor);
        }

        // POST: Admin/EditDoctor/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditDoctor(int id, DoktoriModel doctor)
        {
            if (id != doctor.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(doctor);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DoctorExists(doctor.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Doctors));
            }
            return View(doctor);
        }

        // GET: Admin/DeleteDoctor/5
        public async Task<IActionResult> DeleteDoctor(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doktori
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doctor == null)
            {
                return NotFound();
            }

            return View(doctor);
        }

        // POST: Admin/DeleteDoctor/5
        [HttpPost, ActionName("DeleteDoctor")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmedDoctor(int id)
        {
            var doctor = await _context.Doktori.FindAsync(id);
            _context.Doktori.Remove(doctor);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Doctors));
        }

        private bool DoctorExists(int id)
        {
            return _context.Doktori.Any(e => e.Id == id);
        }

        // PATIENT ACTIONS
        // GET: Admin/Patients
        public async Task<IActionResult> Patients()
        {
            var patients = await _context.Pacienti.ToListAsync();
            return View(patients);
        }

        // GET: Admin/CreatePatient
        public IActionResult CreatePatient()
        {
            return View();
        }

        // POST: Admin/CreatePatient
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreatePatient(PacientiModel patient)
        {
            if (ModelState.IsValid)
            {
                _context.Add(patient);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Patients));
            }
            return View(patient);
        }

        // GET: Admin/EditPatient/5
        public async Task<IActionResult> EditPatient(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var patient = await _context.Pacienti.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }
            return View(patient);
        }

        // POST: Admin/EditPatient/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPatient(int id, PacientiModel patient)
        {
            if (id != patient.Id_P)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(patient);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PatientExists(patient.Id_P))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Patients));
            }
            return View(patient);
        }

        // GET: Admin/DeletePatient/5
        public async Task<IActionResult> DeletePatient(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var patient = await _context.Pacienti
                .FirstOrDefaultAsync(m => m.Id_P == id);
            if (patient == null)
            {
                return NotFound();
            }

            return View(patient);
        }

        // POST: Admin/DeletePatient/5
        [HttpPost, ActionName("DeletePatient")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmedPatient(int id)
        {
            var patient = await _context.Pacienti.FindAsync(id);
            _context.Pacienti.Remove(patient);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Patients));
        }

        private bool PatientExists(int id)
        {
            return _context.Pacienti.Any(e => e.Id_P == id);
        }

        // RESERVATION ACTIONS
        // GET: Admin/Reservations
        public async Task<IActionResult> Reservations()
        {
            var reservations = await _context.ReservationModel
                .Include(r => r.DoctorNavigation)
                .Include(r => r.PatientNavigation)
                .ToListAsync();
            return View(reservations);
        }

        // GET: Admin/CreateReservation
        public IActionResult CreateReservation()
        {
            ViewData["DoctorId"] = new SelectList(_context.Doktori, "Id", "Emri");
            ViewData["PatientId"] = new SelectList(_context.Pacienti, "Id_P", "Emri");
            return View();
        }

        // POST: Admin/CreateReservation
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateReservation(ReservationModel reservation)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reservation);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Reservations));
            }
            ViewData["DoctorId"] = new SelectList(_context.Doktori, "Id", "Emri", reservation.Doctor);
            ViewData["PatientId"] = new SelectList(_context.Pacienti, "Id_P", "Emri", reservation.Patient);
            return View(reservation);
        }

        // GET: Admin/EditReservation/5
        public async Task<IActionResult> EditReservation(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reservation = await _context.ReservationModel.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }
            ViewData["DoctorId"] = new SelectList(_context.Doktori, "Id", "Emri", reservation.Doctor);
            ViewData["PatientId"] = new SelectList(_context.Pacienti, "Id_P", "Emri", reservation.Patient);
            return View(reservation);
        }

        // POST: Admin/EditReservation/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditReservation(int id, ReservationModel reservation)
        {
            if (id != reservation.ReservationId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reservation);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReservationExists(reservation.ReservationId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Reservations));
            }
            ViewData["DoctorId"] = new SelectList(_context.Doktori, "Id", "Emri", reservation.Doctor);
            ViewData["PatientId"] = new SelectList(_context.Pacienti, "Id_P", "Emri", reservation.Patient);
            return View(reservation);
        }

        // GET: Admin/DeleteReservation/5
        public async Task<IActionResult> DeleteReservation(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reservation = await _context.ReservationModel
                .Include(r => r.DoctorNavigation)
                .Include(r => r.PatientNavigation)
                .FirstOrDefaultAsync(m => m.ReservationId == id);
            if (reservation == null)
            {
                return NotFound();
            }

            return View(reservation);
        }

        // POST: Admin/DeleteReservation/5
        [HttpPost, ActionName("DeleteReservation")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmedReservation(int id)
        {
            var reservation = await _context.ReservationModel.FindAsync(id);
            _context.ReservationModel.Remove(reservation);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Reservations));
        }

        private bool ReservationExists(int id)
        {
            return _context.ReservationModel.Any(e => e.ReservationId == id);
        }
    }
}
