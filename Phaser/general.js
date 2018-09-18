inherit = function inherit( me, ancestor )
{
	var p = me.prototype;
	var res = me;
	res.prototype = new ancestor;
	for ( var m in p )
	{
		if ( p.hasOwnProperty( m ) )
			res.prototype[m] = p[m];
	}
	res.superClass = ancestor;
	res.prototype.superClass = ancestor.prototype;

	return res;
};