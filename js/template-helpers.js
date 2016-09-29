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

module.exports.templateWrapper = templateWrapper;
