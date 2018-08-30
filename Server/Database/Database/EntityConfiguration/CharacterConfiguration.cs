using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Database.EntityConfiguration
{
    public class CharacterConfiguration : IEntityTypeConfiguration<Character>
    {
		/// <summary>
		/// Builds the Database relations and columns for type Character
		/// </summary>
		/// <param name="builder"></param>

		public void Configure(EntityTypeBuilder<Character> builder)
        {
            builder.HasKey(character => character.CharacterName);
        }
    }
}
