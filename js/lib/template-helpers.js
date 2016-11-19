function templateWrapper( id, html ) {
    if ( !(typeof html === 'string' )) {
	html = "";
    }

    var tag = '';
    tag += '<div id="' + id + '">';
    tag += html;
    tag += '</div>';
    return tag;
}

function _checkForType( item, type, errorText ) {
    if ( typeof item !== type ) {
	throw TypeError( errorText );
    }
}
