using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
	public class Error
	{
		public enum ErrorCode
		{
			REGISTER_USERNAME_EXISTS = 1,
			LOGIN_USER_OR_PW_WRONG = 2,

		}

		public Error(ErrorCode code, string explanation )
		{
			Code = code;
			Explanation = explanation;
		}

		public ErrorCode Code { get; set; }

		public string Explanation { get; set; }
	}
}
