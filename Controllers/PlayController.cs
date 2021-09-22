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
    [Route("/api/plays")]
    public class PlayController : Controller
    {
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public PlayController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpGet("{theaterId}")]
        public async Task<IEnumerable<PlayResource>> PlaysByTheater(int theaterId)
        {
            var Plays = await context.Plays.Where(play => play.Theater.Id == theaterId).Include(Play=>Play.Theater).ToListAsync();

            return map.Map<List<Play>,List<PlayResource>>(Plays);
        }
        [HttpGet]
        public async Task<IEnumerable<PlayResource>> AllPlays(){
            var Plays = await context.Plays.Include(Plays=>Plays.Theater).Include(Plays=>Plays.Reservations).ToListAsync();

            return map.Map<List<Play>,List<PlayResource>>(Plays);
        }
        [HttpPost]
        public async Task<IActionResult> AddPlay([FromBody] PlayResource play){
            var Play = map.Map<PlayResource,Play>(play);

            Play.Theater =  await this.context.Theaters.FindAsync(play.Theater.Id);


            this.context.Plays.Add(Play);
            await this.context.SaveChangesAsync();

            play.Id = Play.Id;
            return Ok(play);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlay(int id){
            var play = await this.context.Plays.FindAsync(id);
            this.context.Plays.Remove(play);
            await this.context.SaveChangesAsync();

            return Ok(play);
        }
        [HttpGet("play/{id}")]
        public async Task<PlayResource> GetPlay(int id){
            var play = await this.context.Plays.FirstOrDefaultAsync(i=>i.Id==id);

            return map.Map<Play,PlayResource>(play);
        }
    }
}