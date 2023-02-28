using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string Role { get; set; }
    }
}