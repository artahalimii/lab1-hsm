using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace hsm_lab1.Models
{
    public class SherbimiModel
    {
        public int Id_S { get; set; }
        public string? Emri { get; set; }
        public string? Pershkrimi { get; set; }
        public string? Stafi { get; set; }
    }
}