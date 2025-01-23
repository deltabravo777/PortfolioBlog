using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PortfolioBlog.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileuploadController : ControllerBase
    {
        // Set the upload folder to the Client's assets directory
        private readonly string _uploadFolder = Path.Combine(
            Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? string.Empty,
            "portfolioBlog.client",
            "src",
            "assets",
            "blog-pictures"
        );

        // Route: /api/fileupload/uploadfile
        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                // Ensure the directory exists
                if (!Directory.Exists(_uploadFolder))
                {
                    throw new Exception("the file folder should already be there");
                    Directory.CreateDirectory(_uploadFolder);
                }

                // Replace spaces in the filename with underscores
                var sanitizedFileName = file.FileName.Replace(" ", "_");

                // Full path to save the file
                var filePath = Path.Combine(_uploadFolder, sanitizedFileName);

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { Message = "File uploaded successfully", FileName = sanitizedFileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
