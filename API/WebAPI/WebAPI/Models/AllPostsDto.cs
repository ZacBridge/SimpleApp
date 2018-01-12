using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AllPostsDto
    {
        public ICollection<PostsDto> AllPosts { get; set; }
            = new List<PostsDto>();

    }
}
