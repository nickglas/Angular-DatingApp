using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _Auth;
    private readonly IConfiguration _Conf;
    public AuthController(IAuthRepository auth, IConfiguration conf)
    {
      _Conf = conf;
      _Auth = auth;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

      if (await _Auth.UserExists(userForRegisterDto.Username))
      {
        return BadRequest("Username already exists");
      }

      var UserToCreate = new User()
      {
        Username = userForRegisterDto.Username
      };

      var CreatedUser = await _Auth.Register(UserToCreate, userForRegisterDto.Password);
      return StatusCode(201);
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
      var user = await _Auth.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
      if (user == null)
      {
        return Unauthorized();
      }

      var claims = new[]{
          new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
          new Claim(ClaimTypes.Name , user.Username)
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Conf.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor()
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1),
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return Ok(new
      {
        token = tokenHandler.WriteToken(token)
      });
    }
  }
}