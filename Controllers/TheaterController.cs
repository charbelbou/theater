
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
        public async Task<IEnumerable<TheaterResource>> GetTheaters()
        {
            var Theaters = await context.Theaters.Include(Theaters=>Theaters.Plays).ToListAsync();

            return map.Map<List<Theater>,List<TheaterResource>>(Theaters);
        }
        [HttpPost]
        public async Task<IActionResult> AddTheater([FromBody] TheaterResource theater){
            var newTheater = map.Map<TheaterResource,Theater>(theater);
            
            this.context.Theaters.AddRange(newTheater);
            await this.context.SaveChangesAsync();

            theater.Id = newTheater.Id;
            return Ok(theater);
        }
        [HttpDelete("{theaterId}")]
        public async Task<IActionResult> DeleteTheater(int theaterId){
            var theater = await this.context.Theaters.FindAsync(theaterId);
            this.context.Theaters.Remove(theater);

            var plays = await this.context.Plays.Include(plays=>plays.Reservations).Where(play=>play.Theater.Id == theater.Id).ToListAsync();

            if(plays.Any(play=>play.Reservations.Any(reservation=>reservation.Confirmed == "confirmed"))){
                return BadRequest("Can't delete theater with reservations on plays");
            }
            this.context.Plays.RemoveRange(plays);
            await this.context.SaveChangesAsync();

            return Ok(theater);
        }
    }
}