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
    // API has route /api/reservations
    [Route("/api/reservations")]
    public class ReservationController : Controller
    {
        // Inject TheaterDbContext and IMapper
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public ReservationController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpGet("{id}")]
        // Get reservations belonging to a specific Play with id (passed as parameter)
        public async Task<IEnumerable<ReservationResource>> GetReservations(int id){
            // Get all reservations for the Play with the passed Id
            var Reservations = await this.context.Reservations.Where(reservation=>reservation.Play.Id==id).ToListAsync();

            // Map from Reservation to ReservationResource, and return
            return map.Map<List<Reservation>,List<ReservationResource>>(Reservations);
        }
        [HttpGet]
        // Get all Reservations
        public async Task<IEnumerable<ReservationResource>> GetAllReservations(){
            // Get all reservations as List
            var Reservations = await this.context.Reservations.ToListAsync();

            // Map from Reservation to ReservationResource, and return
            return map.Map<List<Reservation>,List<ReservationResource>>(Reservations);
        }
        [HttpPost]
        // Post Reservation
        public async Task<IActionResult> AddReservation([FromBody] List<ReservationResource> reservation){
            // Map the passed reservations from ReservationResource to Reservation
            var newReservations = map.Map<List<ReservationResource>,List<Reservation>>(reservation);

            // Find the Play object to which these reservations belongs to,
            // and assign them to the reservations
            // Avoid duplication
            var Play = await this.context.Plays.FindAsync(reservation.First().PlayId);
            newReservations.ForEach(reservation=>reservation.Play = Play);


            // Add all reservations and save changes
            this.context.Reservations.AddRange(newReservations);
            await this.context.SaveChangesAsync();

            // Return the object
            return Ok(reservation);
        }
        [HttpDelete]
        // Delete Reservation
        public async Task<IActionResult> DeleteReservation([FromBody] ReservationResource reservation){
            // Find the reservation object in DbSet (using PlayId, Place, and UserId)
            var newReservation = await this.context.Reservations.FindAsync(reservation.PlayId,reservation.Place,reservation.UserId);

            // Remove object and save changes
            this.context.Reservations.Remove(newReservation);
            await this.context.SaveChangesAsync();

            // Return reservation
            return Ok(reservation);
        }
        [HttpPut]
        // Update Reservation (for the confirmed status)
        public async Task<IActionResult> UpdateReservation([FromBody] ReservationResource reservation){
            // Find the reservation object in DbSet (using PlayId, Place, and UserId)
            var newReservation = await this.context.Reservations.FindAsync(reservation.PlayId,reservation.Place,reservation.UserId);

            // Update the confirmed status and save changes
            newReservation.Confirmed = reservation.Confirmed;
            await this.context.SaveChangesAsync();
            
            // Return the reservation
            return Ok(reservation);
        }
    }
}