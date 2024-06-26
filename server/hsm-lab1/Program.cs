using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using hsm_lab1.Models;
using hsm_lab1.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<HospitalDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDBConnection"));
        });
        

        builder.Services.AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<HospitalDbContext>()
            .AddSignInManager()
            .AddRoles<IdentityRole>()
            .AddDefaultTokenProviders();

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))

            };
        });

        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Description = "Standard authorization header using Bearer scheme (\"bearer {token}\")",
                In = ParameterLocation.Header,
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });
            options.OperationFilter<SecurityRequirementsOperationFilter>();
        });
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });

        var app = builder.Build();
        

        

        // Create roles
        using (var scope = app.Services.CreateScope())
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            await EnsureRolesAsync(roleManager);
        }

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("AllowSpecificOrigin");

        app.UseAuthentication();
        app.UseAuthorization();
        // Apply CORS middleware
        

        app.MapControllers();

        app.Run();
    }

    private static async Task EnsureRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        string[] roleNames = { "admin", "user", "doktor" };

        foreach (var roleName in roleNames)
        {
            var roleExists = await roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}
