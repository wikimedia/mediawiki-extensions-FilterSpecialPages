( function ( $, mw ) {
	$.extend( $.expr[':'], {
		'containsi': function ( elem, i, match, array )
		{
			return ( elem.textContent || elem.innerText || '' ).toLowerCase()
					.indexOf( ( match[3] || "" ).toLowerCase() ) >= 0;
		}
	} );
	var filterInput = $( '<input \n\
		type="text" \n\
		placeholder="' + mw.message( 'filterspecialpages-hint-label' ).text() + '" \n\
		name="filterspecialpages" \n\
		id="filterspecialpages" />' );
	$( '#bodyContent' ).append( filterInput );
	filterInput.focus();
	filterInput.on( 'keyup', function (e) {
		if ( filterInput.val().length === 0 ) {
			$( '#bodyContent li' ).show();
		} else {
			//display hide all li's where text not in
			$( '#bodyContent li:not(:containsi(' + filterInput.val() + '))' ).hide();
			$( '#bodyContent li:containsi(' + filterInput.val() + ')' ).show();
		}
		//hide empty sections, show non empty sections
		$( '.mw-specialpages-list ul, .mw-specialpages-notes ul' ).each( function () {
			if ( $( this ).children( ':visible' ).length === 0 ) {
				$( this ).parent().prev().hide();
			} else {
				$( this ).parent().prev().show();
			}
		} );

		//if esc key pressed, toggle select input value
		if ( e.keyCode === 27 ) {
			var selection = window.getSelection().toString();
			if ( selection ===  filterInput.val() ) {
				//Cursor to end
				filterInput.focus();
				var tmpStr = filterInput.val();
				filterInput.val( '' );
				filterInput.val( tmpStr );
			} else {
				//select all text
				filterInput.select();
			}
		}

		//if only one entry left, open entry link on enter key
		if ( e.keyCode === 13 ) {
			var visibleLinks = $( '#bodyContent li:containsi(' + filterInput.val() + ')' );
			if ( visibleLinks.size() === 1 ){
				window.location.href = visibleLinks.find("a").attr("href");
			}
		}

	} );

}( jQuery, mediaWiki ) );
