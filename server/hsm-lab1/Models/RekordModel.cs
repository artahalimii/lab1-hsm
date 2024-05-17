﻿namespace hsm_lab1.Models
{
    public class RekordModel
    {
       
        public int Id_Rek { get; set; } 
        public int Id_P { get; set; }
        public int DoctorId { get; set; }
        public string? Diagnoza { get; set; }
        public string? Receta { get; set; }
        public string? Rezultatet { get; set; }
        
        // Assuming you want to establish relationships with Doctor and Patient entities,
        // you can include navigation properties.
        public DoktoriModel Doktori { get; set; }
        public PacientiModel Pacienti { get; set; }
    }
}
