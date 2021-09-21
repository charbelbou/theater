
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
    [Route("/api/theaters")]
    public class TheaterController : Controller
    {
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public TheaterController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Theater>> GetTheaters()
        {
            var Theaters = await context.Theaters.ToListAsync();

            return Theaters;
        }
        [HttpPost]
        public async Task<IActionResult> AddTheater([FromBody] TheaterResource theater){
            var newTheater = map.Map<TheaterResource,Theater>(theater);
            
            this.context.Theaters.Add(newTheater);
            await this.context.SaveChangesAsync();

            theater.Id = newTheater.Id;
            return Ok(theater);
        }
        [HttpDelete("{theaterId}")]
        public async Task<IActionResult> DeleteTheater(int theaterId){
            var theater = await this.context.Theaters.FindAsync(theaterId);
            this.context.Theaters.Remove(theater);

            var plays = await this.context.Plays.Where(play=>play.Theater.Id == theater.Id).ToListAsync();
            foreach(Play play in plays){
                this.context.Plays.Remove(play);
            }
            await this.context.SaveChangesAsync();

            return Ok(plays);
        }
    }
}