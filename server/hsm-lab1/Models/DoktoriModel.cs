﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace hsm_lab1.Models
{
    public class DoktoriModel
    {
        public int Id { get; set; }
        public string? Emri { get; set; }
        public DateTime? DataELindjes { get; set; }
        public string? Email { get; set; }
        public string? Specializimi { get; set; }
        public int? Pervoja { get; set; }
        public string? PhotoFileName { get; set; }

        [ForeignKey("UserId")]
        public string? UserId { get; set; }
        
        public User User { get; set; }
    }
}
