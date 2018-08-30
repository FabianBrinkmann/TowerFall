using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Utility.Hash
{
    public class SHA256Utility
    {
		/// <summary>
		/// Computes SHA256-Hash for a given string
		/// </summary>
		/// <param name="data"></param>
		/// <returns></returns>
        public static string ComputeHash(string data)
        {
            using (SHA256 sha = SHA256.Create())
            {
                byte[] bData = Encoding.UTF8.GetBytes(data);
                byte[] hash = sha.ComputeHash(bData);

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    builder.Append(hash[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }


    }
}
