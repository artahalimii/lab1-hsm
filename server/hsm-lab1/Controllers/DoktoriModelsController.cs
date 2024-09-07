using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hsm_lab1.Database;
using hsm_lab1.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]

[Authorize(Roles = "admin")]
public class DoktoriModelsController : ControllerBase
{
    private readonly HospitalDbContext _context;

    public DoktoriModelsController(HospitalDbContext context)
    {
        _context = context;
    }
   
    // GET: api/DoktoriModels
    /*[HttpGet]
    public async Task<ActionResult<IEnumerable<DoktoriModel>>> GetDoktori()
    {
        if (_context.Doktori == null)
        {
            return NotFound();
        }
        return await _context.Doktori.ToListAsync();
    }
    */
    [HttpGet]
    public async Task<IActionResult> GetDoktori()
    {
        try
        {
            var doktoriList = await _context.Doktori
                .Select(d => new
                {
                    d.Id,
                    d.Emri,
                    d.DataELindjes,
                    d.Email,
                    d.Specializimi,
                    d.Pervoja,
                    d.PhotoFileName,
                    d.UserId
                })
                .ToListAsync();

            if (doktoriList == null || !doktoriList.Any())
            {
                return NotFound("No doktor records found.");
            }
            return Ok(doktoriList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: api/DoktoriModels/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DoktoriModel>> GetDoktoriModel(int id)
    {
        if (_context.Doktori == null)
        {
            return NotFound();
        }
        var doktoriModel = await _context.Doktori.FindAsync(id);

        if (doktoriModel == null)
        {
            return NotFound();
        }

        return doktoriModel;
    }

    // PUT: api/DoktoriModels/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDoktoriModel(int id, DoktoriModel doktoriModel)
    {
        if (id != doktoriModel.Id)
        {
            return BadRequest();
        }

        _context.Entry(doktoriModel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DoktoriModelExists(id))
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

    // POST: api/DoktoriModels
    [HttpPost]
    public async Task<IActionResult> PostDoktoriModel(DoktoriModel doktoriModel)
    {
        if (_context.Doktori == null)
        {
            return Problem("Entity set 'HospitalDbContext.Doktori' is null.");
        }

        // Handle user creation logic separately if needed

        _context.Doktori.Add(doktoriModel);
        await _context.SaveChangesAsync();

        // Return only the doktor attributes
        var result = new
        {
            doktoriModel.Id,
            doktoriModel.Emri,
            doktoriModel.DataELindjes,
            doktoriModel.Email,
            doktoriModel.Specializimi,
            doktoriModel.Pervoja,
            doktoriModel.PhotoFileName,
            doktoriModel.UserId
        };

        return CreatedAtAction("GetDoktoriModel", new { id = doktoriModel.Id }, result);
    }

    // DELETE: api/DoktoriModels/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDoktoriModel(int id)
    {
        if (_context.Doktori == null)
        {
            return NotFound();
        }
        var doktoriModel = await _context.Doktori.FindAsync(id);
        if (doktoriModel == null)
        {
            return NotFound();
        }

        _context.Doktori.Remove(doktoriModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool DoktoriModelExists(int id)
    {
        return (_context.Doktori?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}