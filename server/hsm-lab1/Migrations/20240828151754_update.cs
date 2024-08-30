using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hsm_lab1.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop foreign keys if they exist
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Doktori_AspNetUsers_UserId')
                BEGIN
                    ALTER TABLE [Doktori] DROP CONSTRAINT [FK_Doktori_AspNetUsers_UserId];
                END
            ");

            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Pacienti_AspNetUsers_UserId')
                BEGIN
                    ALTER TABLE [Pacienti] DROP CONSTRAINT [FK_Pacienti_AspNetUsers_UserId];
                END
            ");

            // Add column if it does not exist
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'UserId' AND object_id = OBJECT_ID(N'[Doktori]'))
                BEGIN
                    ALTER TABLE [Doktori] ADD [UserId] nvarchar(450) NULL;
                END
            ");

            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'UserId' AND object_id = OBJECT_ID(N'[Pacienti]'))
                BEGIN
                    ALTER TABLE [Pacienti] ADD [UserId] nvarchar(450) NULL;
                END
            ");

            // Add foreign keys
            migrationBuilder.AddForeignKey(
                name: "FK_Doktori_AspNetUsers_UserId",
                table: "Doktori",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pacienti_AspNetUsers_UserId",
                table: "Pacienti",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop foreign keys if they exist
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Doktori_AspNetUsers_UserId')
                BEGIN
                    ALTER TABLE [Doktori] DROP CONSTRAINT [FK_Doktori_AspNetUsers_UserId];
                END
            ");

            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Pacienti_AspNetUsers_UserId')
                BEGIN
                    ALTER TABLE [Pacienti] DROP CONSTRAINT [FK_Pacienti_AspNetUsers_UserId];
                END
            ");

            // Remove columns if necessary (optional)
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.columns WHERE name = 'UserId' AND object_id = OBJECT_ID(N'[Doktori]'))
                BEGIN
                    ALTER TABLE [Doktori] DROP COLUMN [UserId];
                END
            ");

            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.columns WHERE name = 'UserId' AND object_id = OBJECT_ID(N'[Pacienti]'))
                BEGIN
                    ALTER TABLE [Pacienti] DROP COLUMN [UserId];
                END
            ");

            // Re-add foreign keys with cascade delete
            migrationBuilder.AddForeignKey(
                name: "FK_Doktori_AspNetUsers_UserId",
                table: "Doktori",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pacienti_AspNetUsers_UserId",
                table: "Pacienti",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
