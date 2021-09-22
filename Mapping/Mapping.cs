
using System.Linq;
using AutoMapper;
using theater.Controllers.Resources;
using theater.Models;

namespace theater.Mapping
{
    public class Mapping : Profile
    {
        public Mapping(){
            CreateMap<Play,PlayResource>();
            CreateMap<PlayResource,Play>();

            CreateMap<TheaterResource,Theater>();
            CreateMap<Theater,TheaterResource>();

            CreateMap<ReservationResource,Reservation>();
            CreateMap<Reservation,ReservationResource>();
        }
    }
}