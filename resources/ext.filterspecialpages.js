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
	filterInput.on( 'keyup', function () {
		if ( filterInput.val().length === 0 ) {
			console.log( "empty, show all" );
			$( '#bodyContent li' ).show();
		} else {
			//display hide all li's where text not in
			console.log( "show only containing" + filterInput.val() );
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

	} );
}( jQuery, mediaWiki ) );
