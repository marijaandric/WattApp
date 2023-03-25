namespace backend.Services.Weather
{
    public class WeatherService : IWeatherService
    {
        public void ScrapeWeatherApi()
        {
            Console.WriteLine($"Tu sam kucoo {DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}");
        }
    }
}
