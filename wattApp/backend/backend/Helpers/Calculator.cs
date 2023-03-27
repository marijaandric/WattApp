﻿using backend.Models;

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
    }
}