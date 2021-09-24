using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theater.Controllers.Resources;
using theater.Models;
using theater.Persistence;

namespace theater.Controllers
{
    // API has route /api/plays
    [Route("/api/plays")]
    public class PlayController : Controller
    {
        // Inject TheaterDbContext and IMapper
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public PlayController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpGet("{theaterId}")]
        // HttpGet with theaterId
        // Get all plays belonging to a theater with theaterId
        public async Task<IEnumerable<PlayResource>> PlaysByTheater(int theaterId)
        {
            // Get all plays belonging to the Theater where Id = theaterId
            // Including theater objects
            var Plays = await context.Plays.Where(play => play.Theater.Id == theaterId).Include(Play=>Play.Theater).Include(Play=>Play.Photo).ToListAsync();

            // Map from Play to PlayResource and return list
            return map.Map<List<Play>,List<PlayResource>>(Plays);
        }
        [HttpGet]
        // Get all exisiting Plays in DbSet
        public async Task<IEnumerable<PlayResource>> AllPlays(){
            // Get all plays including the theaters and reservations
            var Plays = await context.Plays.Include(Plays=>Plays.Theater).Include(Plays=>Plays.Reservations).Include(Play=>Play.Photo).ToListAsync();

            // Map from Play to PlayResource and return list
            return map.Map<List<Play>,List<PlayResource>>(Plays);
        }
        [HttpPost]
        // Post a play
        public async Task<IActionResult> AddPlay([FromBody] PlayResource play){
            // Map the PlayResource object to Play
            var Play = map.Map<PlayResource,Play>(play);

            // Find the PlayResources's Theater object, and assign it to the Play
            // This is done to avoid duplicate theaters
            Play.Theater =  await this.context.Theaters.FindAsync(play.Theater.Id);

            // Add play to DbSet and save changes
            this.context.Plays.Add(Play);
            await this.context.SaveChangesAsync();

            // Assign the new Id to PlayResource Id and pass back to client
            play.Id = Play.Id;
            return Ok(play);
        }
        [HttpDelete("{id}")]
        // Delete a play with Id
        public async Task<IActionResult> DeletePlay(int id){
            // Find the play using the Id parameter
            var play = await this.context.Plays.FindAsync(id);

            // Remove play from DbSet and save changes
            this.context.Plays.Remove(play);
            await this.context.SaveChangesAsync();

            // Return the play
            return Ok(play);
        }
        [HttpGet("play/{id}")]
        // Get a play with a specific Id
        public async Task<PlayResource> GetPlay(int id){
            // Get play using Id passed in parameter
            var play = await this.context.Plays.FirstOrDefaultAsync(i=>i.Id==id);

            // Map to PlayResource and return it
            return map.Map<Play,PlayResource>(play);
        }
    }
}