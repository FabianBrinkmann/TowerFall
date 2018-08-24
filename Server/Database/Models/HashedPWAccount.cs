using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Models
{
    public class HashedPWAccount : Account
    {
        public String Hash { get; set; }

        public String Salt { get; set; }
    }
}
