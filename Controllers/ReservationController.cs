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
    [Route("/api/reservations")]
    public class ReservationController : Controller
    {
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public ReservationController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddReservation([FromBody] ReservationResource reservation){
            var newReservation = map.Map<ReservationResource,Reservation>(reservation);
            newReservation.Play = await this.context.Plays.FindAsync(reservation.PlayId);

            this.context.Reservations.Add(newReservation);
            await this.context.SaveChangesAsync();

            return Ok(reservation);
        }
        [HttpGet("{id}")]
        public async Task<IEnumerable<ReservationResource>> GetReservations(int id){
            var Reservations = await this.context.Reservations.Where(reservation=>reservation.Play.Id==id).ToListAsync();

            return map.Map<List<Reservation>,List<ReservationResource>>(Reservations);
        }
        [HttpGet]
        public async Task<IEnumerable<ReservationResource>> GetAllReservations(){
            var Reservations = await this.context.Reservations.ToListAsync();

            return map.Map<List<Reservation>,List<ReservationResource>>(Reservations);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteReservation([FromBody] ReservationResource reservation){
            var newReservation = await this.context.Reservations.FindAsync(reservation.PlayId,reservation.Place,reservation.UserId);
            this.context.Reservations.Remove(newReservation);
            await this.context.SaveChangesAsync();

            return Ok(reservation);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateReservation([FromBody] ReservationResource reservation){
            var newReservation = await this.context.Reservations.FindAsync(reservation.PlayId,reservation.Place,reservation.UserId);
            newReservation.Confirmed = reservation.Confirmed;
            await this.context.SaveChangesAsync();
            
            return Ok(reservation);
        }
    }
}