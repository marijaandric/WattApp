using DeviceFaker.Models;

namespace DeviceFaker.Helpers
{
    public static class Calculate
    {
        public static double CalculateAveragePowerUsage(List<DevicesData> deviceData)
        {
            double pom = 0;
            foreach (var device in deviceData)
            {
                pom += device.PowerUsage;
            }
            return pom / deviceData.Count;
        }
        public static double CalculateTotalPowerUsage(List<DevicesData> deviceData)
        {
            double pom = 0;
            foreach (var device in deviceData)
            {
                pom += device.PowerUsage;
            }
            return pom;
        }
    }
}
