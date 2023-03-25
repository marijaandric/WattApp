using backend.Models;
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
                Console.WriteLine(responseBody);
                return JsonSerializer.Deserialize<DevicesData>(responseBody);
                
            }
        }
    }
}
