using backend.Context;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Globalization;
using backend.BAL;

namespace backend.Services.Weather
{
    public class WeatherService : IWeatherService
    {
        private readonly AppDbContext _context;

        public WeatherService(AppDbContext context)
        {
            _context = context;
        }
        public void ScrapeWeatherApi()
        {
            string weatherapi = "https://api.open-meteo.com/v1/forecast?latitude=44.02&longitude=20.92&hourly=temperature_2m";
            string responseBody = Helpers.HttpRequest.SendHttpRequestForWeather(weatherapi);
            Console.WriteLine(responseBody);
            JObject jsonObject = JObject.Parse(responseBody);

            // Extracting the values for the time and temperature_2m keys
            JArray timeArray = (JArray)jsonObject["hourly"]["time"];
            JArray temperatureArray = (JArray)jsonObject["hourly"]["temperature_2m"];

            // Converting the values to lists of strings and floats respectively
            List<string> timeList = timeArray.Select(t => (string)t).ToList();
            List<float> temperatureList = temperatureArray.Select(t => (float)t).ToList();
            
            var weatherTable = _context.Weathers.ToList();
            _context.Weathers.RemoveRange(weatherTable);
            _context.SaveChanges();

            for(int i = 0; i < timeList.Count; i++)
            {
                DateTime dateTime = DateTime.ParseExact(timeList[i], "yyyy-MM-ddTHH:mm", CultureInfo.InvariantCulture);
                int year = dateTime.Year;
                int month = dateTime.Month;
                int day = dateTime.Day;
                int hour = dateTime.Hour;
                int minute = dateTime.Minute;

                Models.Weather weather = new Models.Weather();

                weather.Year = year;
                weather.Month = month;
                weather.Day = day;
                weather.Time = $"{hour}:{minute}";
                weather.Temperature = temperatureList[i];
                _context.Weathers.AddAsync(weather);
                _context.SaveChangesAsync();
            }

        }
    }
}
