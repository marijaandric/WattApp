using DemoApp.Data;
using DemoApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KnjigaController : Controller
    {
        private readonly KnjigaDbContext knjigaDbContext;

        public KnjigaController(KnjigaDbContext knjigaDbContext)
        {
            this.knjigaDbContext = knjigaDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> dajSveKnjige()
        {
            var knjige = await knjigaDbContext.Knjige.ToListAsync();
            return Ok(knjige);
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("dajKnjigu")]
        public async Task<IActionResult> dajKnjigu([FromRoute] Guid id)
        {
            var knjige = await knjigaDbContext.Knjige.FirstOrDefaultAsync(x => x.Id == id);
            if (knjige != null)
            {
                return Ok(knjige);
            }
            else
            {
                return NotFound("Nije pronadjena");
            }
        }

        [HttpPost]
        public async Task<IActionResult> dodajKnjigu([FromBody] Knjiga knjiga)
        {
            knjiga.Id = Guid.NewGuid();

            await knjigaDbContext.Knjige.AddAsync(knjiga);
            await knjigaDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(dajKnjigu), new { id = knjiga.Id }, knjiga);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> udateKnjigy([FromRoute] Guid id, [FromBody] Knjiga knjiga)
        {
            var knjige = await knjigaDbContext.Knjige.FirstOrDefaultAsync(x => x.Id == id);
            if (knjige != null)
            {
                knjige.Naslov = knjiga.Naslov;
                knjiga.Pisac=knjiga.Pisac;
                knjiga.brojStrana = knjiga.brojStrana;
                knjiga.cena=knjiga.cena;
                await knjigaDbContext.SaveChangesAsync();
                return Ok(knjige);
            }
            return NotFound("Nije pronadjena");
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> obrisatiKnjigu([FromRoute] Guid id)
        {
            var knjige = await knjigaDbContext.Knjige.FirstOrDefaultAsync(x => x.Id == id);
            if (knjige != null)
            {
                knjigaDbContext.Remove(knjige);
                await knjigaDbContext.SaveChangesAsync();
                return Ok(knjige);
            }
            return NotFound("Nije pronadjena");
        }
    }
}
