using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Utility.Hash
{
    public class Salt
    {
        private static RNGCryptoServiceProvider cryptoProvider = new RNGCryptoServiceProvider();

        public static string GenerateSalt(int length)
        {
            byte[] data = new byte[length];
            cryptoProvider.GetBytes( data );
            return Encoding.UTF8.GetString(data);
        }
    }
}
