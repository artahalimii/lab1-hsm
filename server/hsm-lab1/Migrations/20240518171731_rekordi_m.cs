using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hsm_lab1.Migrations
{
    /// <inheritdoc />
    public partial class rekordi_m : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rekord",
                columns: table => new
                {
                    Id_Rek = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_P = table.Column<int>(type: "int", nullable: false),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    Diagnoza = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Receta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rezultatet = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rekord", x => x.Id_Rek);
                    table.ForeignKey(
                        name: "FK_Rekord_Doktori_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doktori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rekord_Pacienti_Id_P",
                        column: x => x.Id_P,
                        principalTable: "Pacienti",
                        principalColumn: "Id_P",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rekord_DoctorId",
                table: "Rekord",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Rekord_Id_P",
                table: "Rekord",
                column: "Id_P");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rekord");
        }
    }
}
