using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theater.Controllers.Resources;
using theater.Models;
using theater.Persistence;

namespace theater.Controllers
{
    [Route("/api/photos")]
    public class PhotoController : Controller
    {
        // Inject TheaterDbContext and IMapper
        private readonly TheaterDbContext context;
        private readonly IMapper map;
        private readonly IWebHostEnvironment host;
        public PhotoController(TheaterDbContext context, IMapper map, IWebHostEnvironment host)
        {
            this.host = host;
            this.map = map;
            this.context = context;
        }
        [HttpGet]
        // Get all existing photos
        public async Task<IEnumerable<PhotoResource>> GetAllPhotos()
        {
            // Get photos
            var photos = await this.context.Photos.ToListAsync();

            // Map them from Photo to PhotoResource and return
            return map.Map<List<Photo>, List<PhotoResource>>(photos);
        }
        [HttpGet("{id}")]
        // HttpGet with Id
        // Get the photo for specific play
        public async Task<PhotoResource> GetPhotoForPlay(int id)
        {
            // Get photo where PlayId is equal to id passed as parameter
            var photo = await this.context.Photos.Where(photo => photo.PlayId == id).FirstOrDefaultAsync();

            // Map from Photo to PhotoResource and return
            return map.Map<Photo, PhotoResource>(photo);
        }
        [HttpPost("{playId}")]
        // Post Photo
        public async Task<PhotoResource> PostPhoto(int playId, IFormFile file)
        {
            // host.WebRootPath = "wwwroot"
            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");

            // If directory doesn't exist, create foler
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            // for security purposes, to prevent user from changing filename and accessing other files
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            // get full filePath with uploadsFolderPath
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            // copying file into stream
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo{
                FileName = fileName,
                PlayId = playId
            };

            this.context.Photos.Add(photo);
            // Using unitOfWork to save changes
            await this.context.SaveChangesAsync();

            return map.Map<Photo,PhotoResource>(photo);
        }
    }
}