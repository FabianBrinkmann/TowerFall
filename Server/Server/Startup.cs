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
			services.AddMvc().SetCompatibilityVersion( CompatibilityVersion.Version_2_1 );
			var dbProvider = Configuration.GetSection( "EntityFramework" )["Databaseprovider"];
			var connection = Configuration.GetConnectionString( dbProvider );

			switch ( dbProvider.ToLower() )
			{ 
				case "sqlite":
					ConfigureEntityFrameworkSQLite( services );
					break;
				case "mssql":
					ConfigureEntityFrameworkMSSQL( services );
					break;
				default:
					ConfigureEntityFrameworkSQLite( services ); // no dependency to extern databaseservice
					break;
			}
		}

		private static void ConfigureEntityFrameworkMSSQL( IServiceCollection services )
		{
			var connection = @"Data Source=.\SQLExpress;Initial Catalog=Towerfall;Integrated Security=True;MultipleActiveResultSets=True;Application Name=Towerfall;Min Pool Size=3;";
			services.AddDbContext<TowerfallContext>( options => options.UseSqlServer( connection ) );
		}

		private static void ConfigureEntityFrameworkSQLite( IServiceCollection services )
		{
			var connection = @"Filename=./towerfall.db";
			services.AddDbContext<TowerfallContext>( options => options.UseSqlite( connection ) );
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

			app.UseHttpsRedirection();
			app.UseMvc();

			using ( var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope() )
			{
				var db = serviceScope.ServiceProvider.GetRequiredService<TowerfallContext>();
				db.Database.Migrate();
			}
		}
	}
}
