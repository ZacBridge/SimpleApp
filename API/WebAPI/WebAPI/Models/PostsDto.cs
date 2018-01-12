using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class PostsDto
    {

        public int Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }

        public string Message { get; set; }
    }
}
