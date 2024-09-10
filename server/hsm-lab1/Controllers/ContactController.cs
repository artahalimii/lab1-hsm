using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Models;
using hsm_lab1.Database;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace hsm_lab1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin,patient")]
    public class ContactController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public ContactController(HospitalDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "admin,patient")]
        public async Task<IActionResult> PostContact([FromBody] ContactModel contact)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Contact saved successfully" });
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();
            return Ok(contacts);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound(new { message = "Contact not found" });
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact deleted successfully" });
        }
    }
}
