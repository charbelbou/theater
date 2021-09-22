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
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Theater> Theaters { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Reservation>().HasKey(res=> new {res.PlayId,res.Place,res.UserId});
        }
    }
}