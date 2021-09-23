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
    // API has route /api/users
    [Route("/api/users")]
    public class UserController : Controller
    {
        // Inject TheaterDbContext and IMapper
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        public UserController(TheaterDbContext context, IMapper map)
        {
            this.map = map;
            this.context = context;

        }
        [HttpPost]
        // Post a user
        public async Task<IActionResult> PostUser([FromBody] UserResource newUser)
        {
            // Map the user object from UserResource to User
            var MappedUser = map.Map<UserResource,User>(newUser);
            // Check if a user with this email exists or not
            var checkedEmail = await this.context.Users.Where(user=>user.Email==newUser.Email).FirstOrDefaultAsync();

            // If it doesn't exist, then add the user and update the id
            if(checkedEmail == null){
                this.context.Users.Add(MappedUser);
                await this.context.SaveChangesAsync();
                newUser.Id = MappedUser.Id;
            }
            // Else, update the id using the already existing id
            else{
                newUser.Id = checkedEmail.Id;
            }

            // Return the user
            return Ok(newUser);
        }
        [HttpGet]
        // Get all existing users
        public async Task<IEnumerable<UserResource>> GetUsers(){
            // Get all the users and map them from User to UserResource
            var users = await this.context.Users.ToListAsync();
            return map.Map<List<User>,List<UserResource>>(users);
        }
    }
}