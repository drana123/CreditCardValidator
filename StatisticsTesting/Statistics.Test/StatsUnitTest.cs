using System;
using Xunit;
using System.Collections.Generic;

namespace Statistics.Test
{
    public class StatsUnitTest
    {
        [Fact]
        public void ReportsAverageMinMax_TakesListOfNumbers_ReturnsStats()
        {
            float epsilon = 0.001F;
            var statsComputer = new StatsComputer();

            var computedStats = statsComputer.CalculateStatistics(
                new List<float> { 1.5f, 8.9f, 3.2f, 4.5f });

            Assert.True(Math.Abs(statsComputer.average - 4.525) <= epsilon);
            Assert.True(Math.Abs(statsComputer.max - 8.9) <= epsilon);
            Assert.True(Math.Abs(statsComputer.min - 1.5) <= epsilon);
        }

        [Fact]
        public void ReportsAverageMinMax_TakesListOfNumbersAndNaN_ReturnsStats()
        {
            float epsilon = 0.001F;
            var statsComputer = new StatsComputer();

            var computedStats = statsComputer.CalculateStatistics(
                new List<float> { 1.5f, float.NaN, 3.2f, 4.3f, float.NaN });

            Assert.True(Math.Abs(statsComputer.average - 3) <= epsilon);
            Assert.True(Math.Abs(statsComputer.max - 4.3) <= epsilon);
            Assert.True(Math.Abs(statsComputer.min - 1.5) <= epsilon);
        }

        [Fact]
        public void ReportsNaNForEmptyInput()
        {
            var statsComputer = new StatsComputer();
            
            var computedStats = statsComputer.CalculateStatistics(
                new List<float> {}) ;
            
            //All fields of computedStats (average, max, min) must be
            //Double.NaN (not-a-number), as described in
            //https://docs.microsoft.com/en-us/dotnet/api/system.double.nan?view=netcore-3.1
            Assert.True(Double.IsNaN(computedStats.average));
            Assert.True(Double.IsNaN(computedStats.max));
            Assert.True(Double.IsNaN(computedStats.min));

        }

        [Fact]
        public void RaisesAlertsIfMaxIsMoreThanThreshold()
        {
            var emailAlert = new EmailAlert();
            var ledAlert = new LEDAlert();
            IAlerter[] alerters = { emailAlert, ledAlert };

            const float maxThreshold = 10.2f;
            var statsAlerter = new StatsAlerter(maxThreshold, alerters);
            statsAlerter.checkAndAlert(new List<float> { 0.2f, 11.9f, 4.3f, 8.5f });

            Assert.True(emailAlert.emailSent);
            Assert.True(ledAlert.ledGlows);
        }


    }
}
