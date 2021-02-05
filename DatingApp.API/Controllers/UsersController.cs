using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private IDatingRepository _D;
    public UsersController(IDatingRepository Drepo)
    {
      _D = Drepo;
    }


    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var users = await _D.GetUsers();
      return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      var user = await _D.GetUser(id);
      return Ok(user);
    }

  }
}