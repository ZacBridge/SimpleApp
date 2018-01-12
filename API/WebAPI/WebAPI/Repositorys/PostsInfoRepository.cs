using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositorys
{
    public class PostsInfoRepository : IPostsInfoRepository
    {

        private PostsInfoContext _context;

        public PostsInfoRepository(PostsInfoContext context)
        {
            _context = context;
        }

        public bool PostExists(int postId)
        {
            return _context.Post.Any(p => p.Id == postId);
        }

        public Posts GetSinglePost(int postId)
        {
            return _context.Post.Where(p => p.Id == postId).FirstOrDefault();
        }



        public IEnumerable<Posts> GetPosts()
        {
            return _context.Post.OrderBy(p => p.Title).ToList();
        }

        public void AddPost(Posts post)
        {
            _context.Add(post);
        }

        public void DeletePost(Posts post)
        {
            _context.Remove(post);
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
