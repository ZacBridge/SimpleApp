using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI
{
    public static class PostsInfoExtensions
    {

        public static void EnsureSeedDataForContext(this PostsInfoContext context)
        {
            //If posts exist, don't create the data
            if (context.Post != null)
            {
                if (context.Post.Any())
                {
                    return;
                }
            }
            if (context.Post.Any())
            {
                return;
            }

            var posts = new List<Posts>()
            {
                new Posts()
                {
                    Title = "Title 1",
                    Category = "Testing Category 1",
                    Message = "This is my message for Title 1 in Category 1"
                },
                new Posts()
                {
                    Title = "Title 2",
                    Category = "Testing Category 2",
                    Message = "This is my message for Title 1 in Category 2"
                },
                new Posts()
                {
                    Title = "Title 3",
                    Category = "Testing Category 3",
                    Message = "This is my message for Title 1 in Category 3"
                },
            };

            context.Post.AddRange(posts);

            context.SaveChanges();
        }
    }
}
