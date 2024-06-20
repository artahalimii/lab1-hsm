using System.ComponentModel.DataAnnotations.Schema;

namespace hsm_lab1.Models
{
    public class PacientiModel
    {
        public int Id_P { get; set; }
        public string? Emri { get; set; }
        public string? Mbiemri { get; set; }
        public DateTime? DataELindjes { get; set; }
        public int? NumriTel { get; set; }
        public string? Gjinia { get; set; }
        public string? Ankesa { get; set; }
        [ForeignKey("UserId")]
        public String? UserId { get; set; }
        
        public User User { get; set; }
    }
}
