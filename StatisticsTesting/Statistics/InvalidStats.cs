using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Statistics
{
    public static class InvalidStats
    {
        public static Stats MakeStatsNan(Stats invalidStats)
        {
            invalidStats.average = float.NaN;
            invalidStats.max = float.NaN;
            invalidStats.min = float.NaN;
            return invalidStats;
        } 
    }
}
