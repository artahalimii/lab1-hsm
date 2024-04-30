﻿
/*using static System.Net.Mime.MediaTypeNames;*/
using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace hsm_lab1.Database
{
   public class HospitalDbContext : IdentityDbContext<IdentityUser>
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options)
            : base(options)
        {
        }

        public DbSet<DoktoriModel> Doktori { get; set; }

        public DbSet<InfermjeriModel> Infermjeri { get; set; }
         public DbSet<PacientiModel> Pacienti { get; set; }


        public DbSet<RecepsionistiModel> Recepsionisti{ get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DoktoriModel>()
                .Property(e => e.DataELindjes)
                .HasColumnType("date")
                .HasConversion(
                    v => v.HasValue ? v.Value.Date : (DateTime?)null,
                    v => v.HasValue ? v.Value : (DateTime?)null);
            modelBuilder.Entity<InfermjeriModel>()
               .HasKey(i => i.Id_i);

            modelBuilder.Entity<PacientiModel>()
               .HasKey(i => i.Id_P);
            modelBuilder.Entity<RecepsionistiModel>()
               .HasKey(i => i.Id_r);

        }
    }
}
