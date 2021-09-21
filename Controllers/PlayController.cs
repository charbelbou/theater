using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IEnumerable<Play>> PlaysByTheater(int theaterId)
        {
            var Plays = await context.Plays.Where(play => play.Theater.Id == theaterId).ToListAsync();

            return Plays;
        }
        [HttpGet]
        public async Task<IEnumerable<Play>> AllPlays(){
            var Plays = await context.Plays.Include(Plays=>Plays.Theater).ToListAsync();
            return Plays;
        }
        [HttpPost]
        public async Task<IActionResult> AddPlay([FromBody] Play play){

            this.context.Plays.Add(play);

            await this.context.SaveChangesAsync();

            return Ok(play);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlay(int id){
            var play = await this.context.Plays.FindAsync(id);
            this.context.Plays.Remove(play);
            await this.context.SaveChangesAsync();

            return Ok(play);
        }
    }
}