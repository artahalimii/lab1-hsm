using hsm_lab1.Database;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class AccountController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly HospitalDbContext _context;

    public AccountController(UserManager<User> userManager, HospitalDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpPost]
    //check nese userid u perdor ma heret
    public async Task<IActionResult> AddDoctorAsync(DoktoriModel doctorModel)
    {
        // Check if the UserId is already used
        var existingDoctor = await _context.Doktori
            .FirstOrDefaultAsync(d => d.UserId == doctorModel.UserId);

        if (existingDoctor != null)
        {
            ModelState.AddModelError("", "This user is already assigned as a doctor.");
            return View(doctorModel); // Or handle the error as appropriate
        }

        // Add the new doctor
        _context.Doktori.Add(doctorModel);
        await _context.SaveChangesAsync();

        return RedirectToAction("Index"); // Or redirect as appropriate
    }

    public async Task<IActionResult> RegisterDoctor(DoktoriModel model, string password)
    {
        if (ModelState.IsValid)
        {
            // Create the user
            var user = new User { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                // Assign the UserId to the Doctor record
                model.UserId = user.Id;

                // Save the doctor record
                _context.Doktori.Add(model);
                await _context.SaveChangesAsync();

                return RedirectToAction("Index", "Home");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return View(model);
    }
}