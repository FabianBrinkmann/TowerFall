using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Utility.Hash
{
    public class Salt
    {
        private static RNGCryptoServiceProvider cryptoProvider = new RNGCryptoServiceProvider();

		/// <summary>
		/// Generates a random string with the given bytelength
		/// </summary>
		/// <param name="length"></param>
		/// <returns>Returns a random string</returns>
        public static string GenerateSalt(int length)
        {
            byte[] data = new byte[length];
            cryptoProvider.GetBytes( data );
			return Convert.ToBase64String( data );
        }
    }
}
