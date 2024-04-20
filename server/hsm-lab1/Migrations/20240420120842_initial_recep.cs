
using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hsm_lab1.Migrations
{
    /// <inheritdoc />
    public partial class initial_recep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recepsionisti",
                columns: table => new
                {
                    Id_r = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataELindjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrariP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VitetEksperienc = table.Column<int>(type: "int", nullable: true),
                    PhotoFileName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recepsionisti", x => x.Id_r);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recepsionisti");
        }
    }
}
