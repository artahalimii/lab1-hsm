using System.ComponentModel.DataAnnotations;

namespace hsm_lab1.Models
{
    public class ContactModel
    {
        [Key]
        public int ContactId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string? Message { get; set; }
    }
}
