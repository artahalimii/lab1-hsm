using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hsm_lab1.Migrations
{
    /// <inheritdoc />
    public partial class reservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservationModel",
                columns: table => new
                {
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReservationTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Patient = table.Column<int>(type: "int", nullable: true),
                    Doctor = table.Column<int>(type: "int", nullable: true),
                   
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationModel", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_ReservationModel_Doktori_Doctor",
                        column: x => x.Doctor,
                        principalTable: "Doktori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    
                    table.ForeignKey(
                        name: "FK_ReservationModel_Pacienti_Patient",
                        column: x => x.Patient,
                        principalTable: "Pacienti",
                        principalColumn: "Id_P",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationModel_Doctor",
                table: "ReservationModel",
                column: "Doctor");

            

            migrationBuilder.CreateIndex(
                name: "IX_ReservationModel_Patient",
                table: "ReservationModel",
                column: "Patient");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationModel");
        }
    }
}
