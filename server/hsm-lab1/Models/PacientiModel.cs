using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // Required for JsonIgnore

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
        public string? UserId { get; set; }

        [JsonIgnore] // This will prevent the User object from being serialized or required on registration
        public User? User { get; set; }
    }
}