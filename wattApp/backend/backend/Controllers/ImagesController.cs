using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.BLL.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesBL _imagesBL;

        public ImagesController(IImagesBL imagesBL)
        {
            _imagesBL = imagesBL;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Images>> GetImages()
        {
            var images = _imagesBL.GetImages();
            return Ok(images);
        }

        [HttpGet("{id}")]
        public ActionResult<Images> GetImage(int id)
        {
            var image = _imagesBL.GetImage(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

        [HttpPost]
        public ActionResult<Images> AddImage(Images image)
        {
            _imagesBL.AddImage(image);
            return CreatedAtAction(nameof(GetImage), new { id = image.Id }, image);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateImage(int id, Images image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _imagesBL.UpdateImage(image);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteImage(int id)
        {
            var image = _imagesBL.GetImage(id);

            if (image == null)
            {
                return NotFound();
            }

            _imagesBL.DeleteImage(id);

            return NoContent();
        }
    }
}
