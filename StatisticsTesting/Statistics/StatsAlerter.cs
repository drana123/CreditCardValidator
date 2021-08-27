using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Statistics
{
    public class StatsAlerter
    {
        float maxthreshold;
        IAlerter[] alerters;

        public StatsAlerter(float maxthreshold, IAlerter[] alerters)
        {
            this.maxthreshold = maxthreshold;
            this.alerters = alerters;
        }

        public void checkAndAlert(List<float> statnumbers)
        {
            for(int i=0;i<statnumbers.Count; i++)
            {
                if (statnumbers[i] >= maxthreshold)
                {
                    alerters[0].AlertTriggerer();
                    alerters[1].AlertTriggerer();
                    break;
                }   
            }
        }
    }
}
