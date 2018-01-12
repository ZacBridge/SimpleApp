using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repositorys;

namespace WebAPI.Controllers
{
    [Route("api/posts")]
    public class PostsController : Controller
    {

        private IPostsInfoRepository _postsInfoRepository;

        public PostsController(IPostsInfoRepository postsInfoRepository)
        {
            _postsInfoRepository = postsInfoRepository;
        }

        [HttpGet()]
        public IActionResult GetPosts()
        {
            var postsEntities = _postsInfoRepository.GetPosts();
            var results = Mapper.Map<IEnumerable<PostsDto>>(postsEntities);
            return Ok(results);
        }

        //Gets single post
        [HttpGet("{id}", Name = "GetPost")]
        public IActionResult GetPointOfInterest(int id)
        {
            //------------------- REPOSITORY ------------------- 

            if (!_postsInfoRepository.PostExists(id))
            {
                return NotFound();
            }

            var SinglePost = _postsInfoRepository.GetSinglePost(id);

            if (SinglePost == null)
            {
                return NotFound();
            }

            var pointOfInterestResult = Mapper.Map<PostsDto>(SinglePost);

            return Ok(pointOfInterestResult);
        }


        [HttpPost()]
        public IActionResult CreatePost([FromBody] CreatePostDto createPost)
        {
            if (createPost == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var finalPost = Mapper.Map<Entities.Posts>(createPost);

            _postsInfoRepository.AddPost(finalPost);

            if (!_postsInfoRepository.Save())
            {
                return StatusCode(500, "A problem happened on the server");
            }

            var createdPostToReturn = Mapper.Map<Models.PostsDto>(finalPost);

            return CreatedAtRoute("GetPost", new
            { id = createdPostToReturn.Id }, createdPostToReturn);
        }


        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            if (!_postsInfoRepository.PostExists(id))
            {
                return NotFound();
            }

            var postEntity = _postsInfoRepository.GetSinglePost(id);
            if (postEntity == null)
            {
                return NotFound();
            }

            _postsInfoRepository.DeletePost(postEntity);

            if (!_postsInfoRepository.Save())
            {
                return StatusCode(500, "Error on server");
            }

            return NoContent();
        }

    }
}
