using backend.BAL;
using backend.BAL.Interfaces;
using backend.BLL;
using backend.BLL.Interfaces;
using backend.Context;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Services.Weather;
using Hangfire;
using Hangfire.Storage.SQLite;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net.Mail;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//User
builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<IUserDAL, UserDAL>();
builder.Services.AddScoped<UsersPaginationProvider, UsersPaginationProviderImpl>();

//Devices
builder.Services.AddScoped<IDevicesBL, DevicesBL>();
builder.Services.AddScoped<IDevicesDAL, DevicesDAL>();

//DevicesData
builder.Services.AddScoped<IDevicesDataBL, DevicesDataBL>();
builder.Services.AddScoped<IDevicesDataDAL, DevicesDataDAL>();

//DevicesAndDevicesData
builder.Services.AddScoped<IDevicesAndDevicesData, DevicesAndDevicesDataBL>();

builder.Services.AddCors( option =>
{
    option.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysecret.......")),
        ValidateAudience = false,
        ValidateIssuer = false
    };
});

builder.Services.AddHangfire( config => config
                            .UseSimpleAssemblyNameTypeSerializer()
                            .UseRecommendedSerializerSettings()
                            .UseSQLiteStorage(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddHangfireServer();
builder.Services.AddTransient<IWeatherService, WeatherService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseHangfireDashboard();
app.MapHangfireDashboard();

RecurringJob.AddOrUpdate<IWeatherService>(x => x.ScrapeWeatherApi(), "0 0 1 * * ?"); //svakog dana u 13:00h
//RecurringJob.AddOrUpdate<IWeatherService>(x => x.ScrapeWeatherApi(), "0 */5 * ? * *"); //pokrenuti ovako samo prilikom testiranja, ovaj cron job se trigeruje svakih 5 minuta
app.Run();
