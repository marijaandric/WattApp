using backend.Models.DTOs;
using System;
using System.Text;
using System.Text.Json;


namespace backend.Helpers
{
    public static class HttpRequest
    {
        public static List<DevicesData> SendHttpRequest(string url)
        {
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = httpClient.GetAsync(url).Result;
                response.EnsureSuccessStatusCode();
                string responseBody = response.Content.ReadAsStringAsync().Result;
                return JsonSerializer.Deserialize<List<DevicesData>>(responseBody);
                
            }
        }

        public static DevicesData SendHttpRequestForDevice(string url)
        {
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = httpClient.GetAsync(url).Result;
                response.EnsureSuccessStatusCode();
                string responseBody = response.Content.ReadAsStringAsync().Result;
                //Console.WriteLine(responseBody);
                return JsonSerializer.Deserialize<DevicesData>(responseBody);
                
            }
        }
        public static List<UsageDTO> SendPostRequestForUsageDTO(string url, List<int> ids)
        {
            using (var httpClient = new HttpClient())
            {
                var content = new StringContent(JsonSerializer.Serialize(ids), Encoding.UTF8, "application/json");
                HttpResponseMessage response = httpClient.PostAsync(url, content).Result;
                response.EnsureSuccessStatusCode();
                string responseBody = response.Content.ReadAsStringAsync().Result;
                //Console.WriteLine(responseBody);
                //Console.WriteLine(JsonSerializer.Deserialize<List<UsageDTO>>(responseBody));
                return JsonSerializer.Deserialize<List<UsageDTO>>(responseBody);
            }
        }


        public static WeekDatasDTO SendHttpRequestForWeekDatas(string url, List<int> ids)
        {
            using (var httpClient = new HttpClient())
            {
                var content = new StringContent(JsonSerializer.Serialize(ids), Encoding.UTF8, "application/json");
                HttpResponseMessage response = httpClient.PostAsync(url, content).Result;
                response.EnsureSuccessStatusCode();
                string responseBody = response.Content.ReadAsStringAsync().Result;
                //Console.WriteLine(responseBody);
                //Console.WriteLine(JsonSerializer.Deserialize<List<UsageDTO>>(responseBody));
                return JsonSerializer.Deserialize<WeekDatasDTO>(responseBody);

            }
        }

        public static string SendHttpRequestForWeather(string url)
        {
            using (var httpClient = new HttpClient())
            {
                HttpResponseMessage response = httpClient.GetAsync(url).Result;
                response.EnsureSuccessStatusCode();
                return response.Content.ReadAsStringAsync().Result;

            }
        }

    }
}
