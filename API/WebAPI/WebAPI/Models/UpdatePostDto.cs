using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class UpdatePostDto
    {
        [Required(ErrorMessage = "Please enter a Title")]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter a Category")]
        [MaxLength(200)]
        public string Category { get; set; }

        [Required(ErrorMessage = "Please enter a Message")]
        [MaxLength(200)]
        public string Message { get; set; }
    }
}
