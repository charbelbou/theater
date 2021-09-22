
using System.Linq;
using AutoMapper;
using theater.Controllers.Resources;
using theater.Models;

namespace theater.Mapping
{
    public class Mapping : Profile
    {
        public Mapping(){
            // Mapping from Play to PlayResource, and vice versa
            CreateMap<Play,PlayResource>();
            CreateMap<PlayResource,Play>();

            // Mapping from Theater to TheaterResource, and vice versa
            CreateMap<Theater,TheaterResource>();
            CreateMap<TheaterResource,Theater>();

            // Mapping from Reservation to ReservationResource, and vice versa
            CreateMap<Reservation,ReservationResource>();
            CreateMap<ReservationResource,Reservation>();
        }
    }
}