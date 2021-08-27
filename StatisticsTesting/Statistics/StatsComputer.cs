using System;
using System.Collections.Generic;

namespace Statistics
{
    public class StatsComputer
    {
        public double average;
        public double min;
        public double max;

        public StatsComputer()
        {
            this.average = 0.0;
            this.max = 0.0;
            this.min = Double.MaxValue;
        }

        public Stats CalculateStatistics(List<float> numbers)
        {
            Stats Values = new Stats();
            if (numbers.Count == 0)
            {
                Values = InvalidStats.MakeStatsNan(Values);
                this.average = float.NaN;
                this.max = float.NaN;
                this.min = float.NaN;
                return Values;
            }
            int inputCount = 0;
            for (int i = 0; i < numbers.Count; i++)
            {
                if (!float.IsNaN(numbers[i]))
                {
                    this.average += numbers[i];
                    this.max = Math.Max(this.max, numbers[i]);
                    this.min = Math.Min(this.min, numbers[i]);
                    inputCount++;
                }
            }
            if (inputCount==0)
            { 
                Values = InvalidStats.MakeStatsNan(Values);
                this.average = float.NaN;
                this.max = float.NaN;
                this.min = float.NaN;
                return Values;
            }
            this.average = this.average / inputCount;
            Values.average = this.average;
            Values.max = this.max;
            Values.min = this.min;
            return Values;
        }

    }
}
