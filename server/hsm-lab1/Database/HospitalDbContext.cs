using hsm_lab1.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace hsm_lab1.Database
{
    public class HospitalDbContext : IdentityDbContext<User>
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options)
            : base(options)
        {
        }

        public DbSet<DoktoriModel> Doktori { get; set; }
        public DbSet<InfermjeriModel> Infermjeri { get; set; }
        public DbSet<PacientiModel> Pacienti { get; set; }
        public DbSet<RecepsionistiModel> Recepsionisti { get; set; }
        public DbSet<RekordModel> Rekord { get; set; }
        public DbSet<ReservationModel> ReservationModel { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);
           



            modelBuilder.Entity<InfermjeriModel>()
                .HasKey(i => i.Id_i);

            modelBuilder.Entity<PacientiModel>()
                .HasKey(i => i.Id_P);

            modelBuilder.Entity<RecepsionistiModel>()
                .HasKey(i => i.Id_r);

            modelBuilder.Entity<RekordModel>()
                .HasKey(i => i.Id_Rek);

            modelBuilder.Entity<RekordModel>()
                .HasOne(r => r.Doktori)
                .WithMany()
                .HasForeignKey(r => r.DoctorId);

            modelBuilder.Entity<RekordModel>()
                .HasOne(r => r.Pacienti)
                .WithMany()
                .HasForeignKey(r => r.Id_P);

            modelBuilder.Entity<ReservationModel>()
                .HasKey(i => i.ReservationId);

            modelBuilder.Entity<ReservationModel>()
                .HasOne(r => r.DoctorNavigation)
                .WithMany()
                .HasForeignKey(r => r.Doctor)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ReservationModel>()
                .HasOne(r => r.PatientNavigation)
                .WithMany()
                .HasForeignKey(r => r.Patient)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
