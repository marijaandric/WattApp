﻿using backend.Models.DTOs;

namespace backend.Helpers
{
    public static class Calculator
    {
        public static double CalculateAveragePowerUsage(List<DevicesData> deviceData)
        {
            double pom = 0;
            foreach (var device in deviceData)
            {
                pom += device.powerUsage;
            }
            return pom/deviceData.Count;
        }
        public static double CalculateTotalPowerUsage(List<DevicesData> deviceData)
        {
            double pom = 0;
            foreach (var device in deviceData)
            {
                pom += device.powerUsage;
            }
            return pom;
        }

        public static double CalculateTotalPowerUsageDTO(List<UsageDTO> devicesData)
        {
            double pom = 0;
            foreach (var device in devicesData)
            {
                pom += device.usage;
            }
            return pom;
        }
    }
}
