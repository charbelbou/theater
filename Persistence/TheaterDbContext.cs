using Microsoft.EntityFrameworkCore;
using theater.Models;

namespace theater.Persistence
{
    public class TheaterDbContext : DbContext
    {
        public TheaterDbContext(DbContextOptions<TheaterDbContext> options) : base(options)
        {
        }

        public DbSet<Play> Plays { get; set; }
        // DbSet of Plays
        public DbSet<Reservation> Reservations { get; set; }
        // DbSet of Reservations
        public DbSet<Theater> Theaters { get; set; }
        // DbSet of Theaters
        public DbSet<User> Users { get; set; }
        // DbSet of Users

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Reservation>().HasKey(res=> new {res.PlayId,res.Place,res.UserId});
        }
        // Reservation key consisting of the PlayId, Place, and UserId
    }
}