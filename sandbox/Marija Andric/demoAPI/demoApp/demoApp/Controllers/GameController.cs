using demoApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace demoApp.Controllers
{

    [Route("/api[controller]")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly DataContext context;

        public GameController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            var games = await context.Games.ToListAsync();

            return Ok(games);
        }

        [HttpPost]
        public async Task<IActionResult> AddGame([FromBody] Game gameReq)
        {
            gameReq.Id = Guid.NewGuid();

            await context.Games.AddAsync(gameReq);
            await context.SaveChangesAsync();

            return Ok(gameReq); 
        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetGame")]
        public async Task<IActionResult> GetGame([FromRoute] Guid id)
        {
            var game = await context.Games.FindAsync(id);
            if(game != null)
            {
                return Ok(game);
            }

            return NotFound("Game not found!");
        }
        
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateGame([FromRoute] Guid id, [FromBody] Game game)
        {
            var existingGame = await context.Games.FindAsync(id);
            if (existingGame != null)
            {
                existingGame.Name = game.Name;
                existingGame.Genre = game.Genre;
                existingGame.Mode = game.Mode;
                existingGame.Description = game.Description;

                await context.SaveChangesAsync();
                return Ok(existingGame);
            }
            return NotFound("Game not found!");
        }
        
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteGame([FromRoute] Guid id)
        {
            var existingGame = await context.Games.FirstOrDefaultAsync(x => x.Id == id);
            if (existingGame != null)
            {
                context.Remove(existingGame);
                await context.SaveChangesAsync();
                return Ok(existingGame);
            }
            return NotFound("Game not found!");
        }
    }
}
