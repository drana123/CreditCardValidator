using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Statistics
{
    public class LEDAlert : IAlerter
    {
        public bool ledGlows;

        public LEDAlert()
        {
            this.ledGlows = false;
        }
        public void AlertTriggerer()
        {
            this.ledGlows = true;
        }

        public bool ledTrigger()
        {
            if (this.ledGlows)
            {
                this.ledGlows = false;
                return true;
            }
            else return false;
        }

    }
}
