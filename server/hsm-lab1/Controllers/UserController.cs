using Microsoft.AspNetCore.Mvc;
using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using hsm_lab1.Models;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public UserController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        try
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine($"Exception while fetching users: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
}

