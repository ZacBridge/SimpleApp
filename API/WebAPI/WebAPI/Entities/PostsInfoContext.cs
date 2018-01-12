using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class PostsInfoContext : DbContext
    {

        public PostsInfoContext(DbContextOptions<PostsInfoContext> options)
            : base(options)
        {
            Database.Migrate();
        }


        public DbSet<Posts> Post { get; set; }
    }
}
