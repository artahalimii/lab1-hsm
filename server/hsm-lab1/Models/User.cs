using Microsoft.AspNetCore.Identity;

namespace hsm_lab1.Models
{
    public class User : IdentityUser
    {
        public string UserRole { get; set; }
    }
}
