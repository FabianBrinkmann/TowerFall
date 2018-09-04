using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database.Database;
using Database.Models;
using Microsoft.Extensions.DependencyInjection;
using Entities.Models;
using Utility.Hash;
using Database.Database.Extensions;
using System.Net;
using Server.Models;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Server.Controllers
{
	[Route( "api/v1" )]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly TowerfallContext _context;
		private readonly IConfiguration config;
		private readonly int SALT_LENGTH = 512;

		public AccountController( IConfiguration _config, TowerfallContext context )
		{
			_context = context;
			config = _config;
		}

#if DEBUG
		[Route( "accountsdebug" )]
		[HttpGet]
		[Authorize]
		public IEnumerable<HashedPWAccount> GetAccounts()
		{
			return _context.Accounts;
		}
#endif

		[Route( "login" )]
		[HttpPost]
		public async Task<IActionResult> Login( [FromBody] Account account )
		{
			if ( !( await _context.Accounts.ValidateAsync( account ) ) )
				return StatusCode( (int) HttpStatusCode.Unauthorized,
					new Error( Error.ErrorCode.LOGIN_USER_OR_PW_WRONG, "Username or password wrong" ) );
			return Ok( new { token = BuildToken( account ) } );
		}

		[Route( "register" )]
		[HttpPost]
		public async Task<IActionResult> Register( [FromBody] Account account )
		{
			if ( _context.Accounts.UsernameExists( account.User ) )
			{
				return StatusCode( (int) HttpStatusCode.Conflict,
					new Error( Error.ErrorCode.REGISTER_USERNAME_EXISTS, "Username already used" ) );
			}
			_context.Accounts.AddAccount( account, SALT_LENGTH );
			await _context.SaveChangesAsync();
			return Ok( new { token = BuildToken( account ) } );
		}

		private string BuildToken( Account user )
		{
			var key = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( config["Jwt:Key"] ) );
			var creds = new SigningCredentials( key, SecurityAlgorithms.HmacSha256 );

			var token = new JwtSecurityToken( config["Jwt:Issuer"],
				audience: config["Jwt:Issuer"],
				claims: new Claim[] {new Claim(ClaimTypes.Name, user.User)},
				notBefore: DateTime.Now,
				signingCredentials: creds
				);

			return new JwtSecurityTokenHandler().WriteToken( token );
		}
	}
}