using hsm_lab1.Database;
namespace hsm_lab1.Models
{
    public class ReservationModel
    {

        public int ReservationId { get; set; }
        public DateTime? ReservationDate { get; set; }
        public string? ReservationTime { get; set; }
        public int Patient { get; set; }
        public int Doctor { get; set; }

        public  DoktoriModel? DoctorNavigation { get; set; }
        public  PacientiModel? PatientNavigation { get; set; }

    }
}


