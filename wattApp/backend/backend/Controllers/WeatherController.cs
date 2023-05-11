using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class WeatherController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WeatherController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("getCurrentData/")]
        public IActionResult GetCurrentData()
        {
            DateTime now = DateTime.Now;
            var result = _context.Weather.FirstOrDefault(t => t.Month == now.Month && t.Day == now.Day && t.Time == now.Hour);
            return Ok(result);
        }

        [HttpGet("getMinMaxAvgTemperatureDataForNextSevenDays/")]
        public IActionResult GetDataForNextFiveDays()
        {
            DateTime now = DateTime.Now;
            
            List<int> days = new List<int>();

            List<Weather> dataOrderedByMaxTemperature = _context.Weather.OrderByDescending(t => t.Temperature).ToList();
            List<Weather> dataOrderedByMinTemperature = _context.Weather.OrderBy(t => t.Temperature).ToList();

            Dictionary<string, float> maxs = new Dictionary<string, float>();
            Dictionary<string, float> mins = new Dictionary<string, float>();
            Dictionary<string, float> avg = new Dictionary<string, float>();

            int count = dataOrderedByMaxTemperature.Count;

            for(int i = 0; i < count; i++)
            {
                //maxs
                if (maxs.ContainsKey(dataOrderedByMaxTemperature[i].Day + "." + dataOrderedByMaxTemperature[i].Month) == false)
                    maxs.Add(dataOrderedByMaxTemperature[i].Day + "." + dataOrderedByMaxTemperature[i].Month, dataOrderedByMaxTemperature[i].Temperature);

                //mins
                if (mins.ContainsKey(dataOrderedByMinTemperature[i].Day + "." + dataOrderedByMinTemperature[i].Month) == false)
                    mins.Add(dataOrderedByMinTemperature[i].Day + "." + dataOrderedByMinTemperature[i].Month, dataOrderedByMinTemperature[i].Temperature);
            }

            maxs = maxs.OrderByDescending(t => int.Parse(t.Key.Split(".")[1])).ThenBy(t => int.Parse(t.Key.Split(".")[0])).ToDictionary(d => d.Key, d => d.Value);
            mins = mins.OrderByDescending(t => int.Parse(t.Key.Split(".")[1])).ThenBy(t => int.Parse(t.Key.Split(".")[0])).ToDictionary(d => d.Key, d => d.Value);
            
            List<string> dates = maxs.Keys.ToList();
            List<float> maxsList = maxs.Values.ToList();
            List<float> minsList = mins.Values.ToList();

            count = maxsList.Count;

            for (int i = 0; i < count; i++)
                avg.Add(dates[i], ( (maxsList[i] + minsList[i]) / 2) );

            return Ok(
                new
                {
                    maxs, // = maxs.OrderByDescending(t => int.Parse(t.Key.Split(".")[1])).ThenBy(t => int.Parse(t.Key.Split(".")[0])).ToDictionary(d => d.Key, d => d.Value),
                    mins,// = mins.OrderByDescending(t => int.Parse(t.Key.Split(".")[1])).ThenBy(t => int.Parse(t.Key.Split(".")[0])).ToDictionary(d => d.Key, d => d.Value)
                    avg
                });
        }
    }
}
