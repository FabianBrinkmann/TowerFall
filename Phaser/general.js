/**
 * Inherits from another prototype
 * @param me constructor function of child
 * @param ancestor constructor function of ancestor
 * @return {*}
 */
var inherit = function( me, ancestor ) {
	var p = me.prototype;
	var res = me;
	res.prototype = new ancestor;
	for( var m in p ) {
		if( p.hasOwnProperty( m ) )
			res.prototype[ m ] = p[ m ];
	}
	res.superClass = ancestor;
	res.prototype.superClass = ancestor.prototype;

	return res;
};