using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Statistics
{
    public class EmailAlert : IAlerter
    {
        public bool emailSent;

        public EmailAlert()
        {
            this.emailSent = false;
        }
        public void AlertTriggerer()
        {
            this.emailSent = true;
        }
        public bool emailTrigger()
        {
            if (this.emailSent)
            {
                this.emailSent = false;
                return true;
            }
            else return false;
        }

    }
}
