using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hsm_lab1.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Infermjeri",
                columns: table => new
                {
                    Id_i = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataELindjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumriTel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Departamenti = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VitetPune = table.Column<int>(type: "int", nullable: true),
                    PhotoFile = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infermjeri", x => x.Id_i);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Infermjeri");
        }
    }
}
