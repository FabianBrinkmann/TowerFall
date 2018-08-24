﻿// <auto-generated />
using Database.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Database.Migrations
{
	[DbContext( typeof( TowerfallContext ) )]
	[Migration( "20180824081923_Towerfall" )]
	partial class Towerfall
	{
		protected override void BuildTargetModel( ModelBuilder modelBuilder )
		{
#pragma warning disable 612, 618
			modelBuilder
				.HasAnnotation( "ProductVersion", "2.1.2-rtm-30932" )
				.HasAnnotation( "Relational:MaxIdentifierLength", 128 )
				.HasAnnotation( "SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn );

			modelBuilder.Entity( "Database.Models.HashedPWAccount", b =>
				 {
					 b.Property<string>( "User" )
						 .ValueGeneratedOnAdd();

					 b.Property<string>( "Hash" )
						 .HasColumnName( "HashedPassword" );

					 b.Property<string>( "Salt" );

					 b.HasKey( "User" );

					 b.ToTable( "Accounts" );
				 } );

			modelBuilder.Entity( "Entities.Models.Character", b =>
				 {
					 b.Property<string>( "CharacterName" )
						 .ValueGeneratedOnAdd();

					 b.HasKey( "CharacterName" );

					 b.ToTable( "Characters" );
				 } );
#pragma warning restore 612, 618
		}
	}
}
