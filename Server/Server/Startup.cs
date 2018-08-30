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

		private readonly string CORSPOLICY = "CorsPolicy";

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

			services.AddCors( options =>
			{
				options.AddPolicy( CORSPOLICY,
					builder => builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials()
					.Build() );
			} );

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
			app.UseCors( CORSPOLICY );

			using ( var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope() )
			{
				var db = serviceScope.ServiceProvider.GetRequiredService<TowerfallContext>();
				db.Database.Migrate();
			}

			

		}
	}
}
