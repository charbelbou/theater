
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
    // API has route /api/theaters
    [Route("/api/theaters")]
    public class TheaterController : Controller
    {
        // Inject TheaterDbContext and IMapper
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public TheaterController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpGet]
        // Get all Theaters
        public async Task<IEnumerable<TheaterResource>> GetTheaters()
        {
            // Get all theaters
            var Theaters = await context.Theaters.Include(Theaters=>Theaters.Plays).ToListAsync();

            // Map from Theater to TheaterResource, and return
            return map.Map<List<Theater>,List<TheaterResource>>(Theaters);
        }
        [HttpPost]
        // Post Theater
        public async Task<IActionResult> AddTheater([FromBody] TheaterResource theater){
            // Map theater from TheaterResource to Theater
            var newTheater = map.Map<TheaterResource,Theater>(theater);
            
            // Add the theater to DbSet and save changes
            this.context.Theaters.AddRange(newTheater);
            await this.context.SaveChangesAsync();

            // Assign the newTheater Id to theater Id and return
            theater.Id = newTheater.Id;
            return Ok(theater);
        }
        [HttpDelete("{theaterId}")]
        // Delete Theater with theaterId, passed as parameter
        public async Task<IActionResult> DeleteTheater(int theaterId){
            // Find the theater with theaterId, and remove from DbSet
            var theater = await this.context.Theaters.FindAsync(theaterId);
            this.context.Theaters.Remove(theater);

            // Need to make sure the theater that's being removed doesn't have any plays in it
            // which have a confirmed reservation

            // Get all the plays that belong to this theater, and include reservations
            var plays = await this.context.Plays.Include(plays=>plays.Reservations).Where(play=>play.Theater.Id == theater.Id).ToListAsync();

            // Check if any of these reservations are confirmed
            if(plays.Any(play=>play.Reservations.Any(reservation=>reservation.Confirmed == "confirmed"))){
                // If at least one of the reservations is confirmed, return a BadRequest
                return BadRequest("Can't delete theater with reservations on plays");
            }

            // Else, remove the plays and save changes
            this.context.Plays.RemoveRange(plays);
            await this.context.SaveChangesAsync();

            // Return the theater
            return Ok(theater);
        }
    }
}