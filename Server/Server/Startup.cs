#define USE_SQLITE

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Server
{
	public class Startup
	{
		public Startup( IConfiguration configuration )
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices( IServiceCollection services )
		{
			services.AddSingleton<IConfiguration>( Configuration );
			services.AddAuthentication( JwtBearerDefaults.AuthenticationScheme )
			.AddJwtBearer( options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = false,
					ValidateIssuerSigningKey = true,
					ValidIssuer = Configuration["Jwt:Issuer"],
					ValidAudience = Configuration["Jwt:Issuer"],
					IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( Configuration["Jwt:Key"] ) )
				};
			} );

			services.AddMvc().SetCompatibilityVersion( CompatibilityVersion.Version_2_1 );

			ConfigureEntityFramework( services );


		}



		private void ConfigureEntityFramework( IServiceCollection services )
		{
			var dbProvider = Configuration.GetSection( "EntityFramework" )["Databaseprovider"];
			var connection = Configuration.GetConnectionString( dbProvider );

			switch ( dbProvider.ToLower() )
			{
				case "sqlite":
					ConfigureEntityFrameworkSQLite( services, connection );
					break;
				case "mssql":
					ConfigureEntityFrameworkMSSQL( services, connection );
					break;
				default:
					ConfigureEntityFrameworkSQLite( services, connection ); // no dependency to extern databaseservice
					break;
			}
		}

		private static void ConfigureEntityFrameworkMSSQL( IServiceCollection services, string connectionString )
		{
			services.AddDbContext<TowerfallContext>( options => options.UseSqlServer( connectionString ) );
		}

		private static void ConfigureEntityFrameworkSQLite( IServiceCollection services, string ConnectionString )
		{
			services.AddDbContext<TowerfallContext>( options => options.UseSqlite( ConnectionString ) );
		}
		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure( IApplicationBuilder app, IHostingEnvironment env )
		{
			if ( env.IsDevelopment() )
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}
			app.UseAuthentication();
			app.UseHttpsRedirection();
			app.UseMvc();

			using ( var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope() )
			{
				var db = serviceScope.ServiceProvider.GetRequiredService<TowerfallContext>();
				db.Database.Migrate();
			}

		}

		/// <summary>
		/// Creates symmetric keys and stores them in registry
		/// </summary>
		public void CreateKeys()
		{
			RegistryKey key = Registry.CurrentUser.CreateSubKey( "TowerfallKeys" );
			if ( key.GetValue( "key" ) != null && key.GetValue( "iv" ) != null )
				return; //Keys already present. No need to create new
			using ( RijndaelManaged rijn = new RijndaelManaged() )
			{
				rijn.GenerateKey();
				rijn.GenerateIV();

				var rijnKey = rijn.Key;
				var rijnIV = rijn.IV;
				key.SetValue( "key", System.Convert.ToBase64String( rijnKey ) );
				key.SetValue( "iv", System.Convert.ToBase64String( rijnIV ) );
				key.Close();
			}
		}

		public (byte[] key, byte[] iv) GetKeys()
		{
			var key = Registry.CurrentUser.OpenSubKey( "TowerfallKeys" );
			var b64Key = (string) key.GetValue( "key" );
			var b64iv = (string) key.GetValue( "iv" );
			var bArrKey = System.Convert.FromBase64String( b64Key );
			var bArrIV = System.Convert.FromBase64String( b64iv );
			return (bArrKey, bArrIV);
		}
	}
}
