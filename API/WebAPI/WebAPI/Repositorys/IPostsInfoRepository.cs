using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositorys
{
    public interface IPostsInfoRepository
    {

        IEnumerable<Posts> GetPosts();

        void AddPost(Posts post);

        void DeletePost(Posts post);

        bool Save();

        bool PostExists(int postId);

        Posts GetSinglePost(int postId);

    }
}
