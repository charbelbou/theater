
using System.Linq;
using AutoMapper;
using theater.Controllers.Resources;
using theater.Models;

namespace theater.Mapping
{
    public class Mapping : Profile
    {
        public Mapping(){
            CreateMap<TheaterResource,Theater>();
        }
    }
}