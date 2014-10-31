// var towns = ["Abington","Acton","Acushnet","Adams","Agawam","Alford","Amesbury","Amherst","Andover","Aquinnah","Arlington","Ashburnham","Ashby","Ashfield","Ashland","Athol","Attleboro","Auburn","Avon","Ayer","Barnstable","Barre","Becket","Bedford","Belchertown","Bellingham","Belmont","Berkley","Berlin","Bernardston","Beverly","Billerica","Blackstone","Blandford","Bolton","Boston","Bourne","Boxborough","Boxford","Boylston","Braintree","Brewster","Bridgewater","Brimfield","Brockton","Brookfield","Brookline","Buckland","Burlington","Cambridge","Canton","Carlisle","Carver","Charlemont","Charlton","Chatham","Chelmsford","Chelsea","Cheshire","Chester","Chesterfield","Chicopee","Chilmark","Clarksburg","Clinton","Cohasset","Colrain","Concord","Conway","Cummington","Dalton","Danvers","Dartmouth","Dedham","Deerfield","Dennis","Dighton","Douglas","Dover","Dracut","Dudley","Dunstable","Duxbury","East Bridgewater","East Brookfield","East Longmeadow","Eastham","Easthampton","Easton","Edgartown","Egremont","Erving","Essex","Everett","Fairhaven","Fall River","Falmouth","Fitchburg","Florida","Foxborough","Framingham","Franklin","Freetown","Gardner","Georgetown","Gill","Gloucester","Goshen","Gosnold","Grafton","Granby","Granville","Great Barrington","Greenfield","Groton","Groveland","Hadley","Halifax","Hamilton","Hampden","Hancock","Hanover","Hanson","Hardwick","Harvard","Harwich","Hatfield","Haverhill","Hawley","Heath","Hingham","Hinsdale","Holbrook","Holden","Holland","Holliston","Holyoke","Hopedale","Hopkinton","Hubbardston","Hudson","Hull","Huntington","Ipswich","Kingston","Lakeville","Lancaster","Lanesborough","Lawrence","Lee","Leicester","Lenox","Leominster","Leverett","Lexington","Leyden","Lincoln","Littleton","Longmeadow","Lowell","Ludlow","Lunenburg","Lynn","Lynnfield","Malden","Manchester","Mansfield","Marblehead","Marion","Marlborough","Marshfield","Mashpee","Mattapoisett","Maynard","Medfield","Medford","Medway","Melrose","Mendon","Merrimac","Methuen","Middleborough","Middlefield","Middleton","Milford","Millbury","Millis","Millville","Milton","Monroe","Monson","Montague","Monterey","Montgomery","Mount Washington","Nahant","Nantucket","Natick","Needham","New Ashford","New Bedford","New Braintree","New Marlborough","New Salem","Newbury","Newburyport","Newton","Norfolk","North Adams","North Andover","North Attleborough","North Brookfield","North Reading","Northampton","Northborough","Northbridge","Northfield","Norton","Norwell","Norwood","Oak Bluffs","Oakham","Orange","Orleans","Otis","Oxford","Palmer","Paxton","Peabody","Pelham","Pembroke","Pepperell","Peru","Petersham","Phillipston","Pittsfield","Plainfield","Plainville","Plymouth","Plympton","Princeton","Provincetown","Quincy","Randolph","Raynham","Reading","Rehoboth","Revere","Richmond","Rochester","Rockland","Rockport","Rowe","Rowley","Royalston","Russell","Rutland","Salem","Salisbury","Sandisfield","Sandwich","Saugus","Savoy","Scituate","Seekonk","Sharon","Sheffield","Shelburne","Sherborn","Shirley","Shrewsbury","Shutesbury","Somerset","Somerville","South Hadley","Southampton","Southborough","Southbridge","Southwick","Spencer","Springfield","Sterling","Stockbridge","Stoneham","Stoughton","Stow","Sturbridge","Sudbury","Sunderland","Sutton","Swampscott","Swansea","Taunton","Templeton","Tewksbury","Tisbury","Tolland","Topsfield","Townsend","Truro","Tyngsborough","Tyringham","Upton","Uxbridge","Wakefield","Wales","Walpole","Waltham","Ware","Wareham","Warren","Warwick","Washington","Watertown","Wayland","Webster","Wellesley","Wellfleet","Wendell","Wenham","West Boylston","West Bridgewater","West Brookfield","West Newbury","West Springfield","West Stockbridge","West Tisbury","Westborough","Westfield","Westford","Westhampton","Westminster","Weston","Westport","Westwood","Weymouth","Whately","Whitman","Wilbraham","Williamsburg","Williamstown","Wilmington","Winchendon","Winchester","Windsor","Winthrop","Woburn","Worcester","Worthington","Wrentham","Yarmouth"];

$('.elections-nav__race-select').change(function() {
	location.href = $( this ).val();
});

// $('input[list]').datalist('200px','false');

// var _fuzzySearchData = [{"label": "Abington"},{"label": "Acton"},{"label": "Acushnet"},{"label": "Adams"},{"label": "Agawam"},{"label": "Alford"},{"label": "Amesbury"},{"label": "Amherst"},{"label": "Andover"},{"label": "Aquinnah"},{"label": "Arlington"},{"label": "Ashburnham"},{"label": "Ashby"},{"label": "Ashfield"},{"label": "Ashland"},{"label": "Athol"},{"label": "Attleboro"},{"label": "Auburn"},{"label": "Avon"},{"label": "Ayer"},{"label": "Barnstable"},{"label": "Barre"},{"label": "Becket"},{"label": "Bedford"},{"label": "Belchertown"},{"label": "Bellingham"},{"label": "Belmont"},{"label": "Berkley"},{"label": "Berlin"},{"label": "Bernardston"},{"label": "Beverly"},{"label": "Billerica"},{"label": "Blackstone"},{"label": "Blandford"},{"label": "Bolton"},{"label": "Boston"},{"label": "Bourne"},{"label": "Boxborough"},{"label": "Boxford"},{"label": "Boylston"},{"label": "Braintree"},{"label": "Brewster"},{"label": "Bridgewater"},{"label": "Brimfield"},{"label": "Brockton"},{"label": "Brookfield"},{"label": "Brookline"},{"label": "Buckland"},{"label": "Burlington"},{"label": "Cambridge"},{"label": "Canton"},{"label": "Carlisle"},{"label": "Carver"},{"label": "Charlemont"},{"label": "Charlton"},{"label": "Chatham"},{"label": "Chelmsford"},{"label": "Chelsea"},{"label": "Cheshire"},{"label": "Chester"},{"label": "Chesterfield"},{"label": "Chicopee"},{"label": "Chilmark"},{"label": "Clarksburg"},{"label": "Clinton"},{"label": "Cohasset"},{"label": "Colrain"},{"label": "Concord"},{"label": "Conway"},{"label": "Cummington"},{"label": "Dalton"},{"label": "Danvers"},{"label": "Dartmouth"},{"label": "Dedham"},{"label": "Deerfield"},{"label": "Dennis"},{"label": "Dighton"},{"label": "Douglas"},{"label": "Dover"},{"label": "Dracut"},{"label": "Dudley"},{"label": "Dunstable"},{"label": "Duxbury"},{"label": "East Bridgewater"},{"label": "East Brookfield"},{"label": "Eastham"},{"label": "Easthampton"},{"label": "East Longmeadow"},{"label": "Easton"},{"label": "Edgartown"},{"label": "Egremont"},{"label": "Erving"},{"label": "Essex"},{"label": "Everett"},{"label": "Fairhaven"},{"label": "Fall River"},{"label": "Falmouth"},{"label": "Fitchburg"},{"label": "Florida"},{"label": "Foxborough"},{"label": "Framingham"},{"label": "Franklin"},{"label": "Freetown"},{"label": "Gardner"},{"label": "Georgetown"},{"label": "Gill"},{"label": "Gloucester"},{"label": "Goshen"},{"label": "Gosnold"},{"label": "Grafton"},{"label": "Granby"},{"label": "Granville"},{"label": "Great Barrington"},{"label": "Greenfield"},{"label": "Groton"},{"label": "Groveland"},{"label": "Hadley"},{"label": "Halifax"},{"label": "Hamilton"},{"label": "Hampden"},{"label": "Hancock"},{"label": "Hanover"},{"label": "Hanson"},{"label": "Hardwick"},{"label": "Harvard"},{"label": "Harwich"},{"label": "Hatfield"},{"label": "Haverhill"},{"label": "Hawley"},{"label": "Heath"},{"label": "Hingham"},{"label": "Hinsdale"},{"label": "Holbrook"},{"label": "Holden"},{"label": "Holland"},{"label": "Holliston"},{"label": "Holyoke"},{"label": "Hopedale"},{"label": "Hopkinton"},{"label": "Hubbardston"},{"label": "Hudson"},{"label": "Hull"},{"label": "Huntington"},{"label": "Ipswich"},{"label": "Kingston"},{"label": "Lakeville"},{"label": "Lancaster"},{"label": "Lanesborough"},{"label": "Lawrence"},{"label": "Lee"},{"label": "Leicester"},{"label": "Lenox"},{"label": "Leominster"},{"label": "Leverett"},{"label": "Lexington"},{"label": "Leyden"},{"label": "Lincoln"},{"label": "Littleton"},{"label": "Longmeadow"},{"label": "Lowell"},{"label": "Ludlow"},{"label": "Lunenburg"},{"label": "Lynn"},{"label": "Lynnfield"},{"label": "Malden"},{"label": "Manchester"},{"label": "Mansfield"},{"label": "Marblehead"},{"label": "Marion"},{"label": "Marlborough"},{"label": "Marshfield"},{"label": "Mashpee"},{"label": "Mattapoisett"},{"label": "Maynard"},{"label": "Medfield"},{"label": "Medford"},{"label": "Medway"},{"label": "Melrose"},{"label": "Mendon"},{"label": "Merrimac"},{"label": "Methuen"},{"label": "Middleborough"},{"label": "Middlefield"},{"label": "Middleton"},{"label": "Milford"},{"label": "Millbury"},{"label": "Millis"},{"label": "Millville"},{"label": "Milton"},{"label": "Monroe"},{"label": "Monson"},{"label": "Montague"},{"label": "Monterey"},{"label": "Montgomery"},{"label": "Mount Washington"},{"label": "Nahant"},{"label": "Nantucket"},{"label": "Natick"},{"label": "Needham"},{"label": "New Ashford"},{"label": "New Bedford"},{"label": "New Braintree"},{"label": "Newbury"},{"label": "Newburyport"},{"label": "New Marlborough"},{"label": "New Salem"},{"label": "Newton"},{"label": "Norfolk"},{"label": "North Adams"},{"label": "Northampton"},{"label": "North Andover"},{"label": "North Attleborough"},{"label": "Northborough"},{"label": "Northbridge"},{"label": "North Brookfield"},{"label": "Northfield"},{"label": "North Reading"},{"label": "Norton"},{"label": "Norwell"},{"label": "Norwood"},{"label": "Oak Bluffs"},{"label": "Oakham"},{"label": "Orange"},{"label": "Orleans"},{"label": "Otis"},{"label": "Oxford"},{"label": "Palmer"},{"label": "Paxton"},{"label": "Peabody"},{"label": "Pelham"},{"label": "Pembroke"},{"label": "Pepperell"},{"label": "Peru"},{"label": "Petersham"},{"label": "Phillipston"},{"label": "Pittsfield"},{"label": "Plainfield"},{"label": "Plainville"},{"label": "Plymouth"},{"label": "Plympton"},{"label": "Princeton"},{"label": "Provincetown"},{"label": "Quincy"},{"label": "Randolph"},{"label": "Raynham"},{"label": "Reading"},{"label": "Rehoboth"},{"label": "Revere"},{"label": "Richmond"},{"label": "Rochester"},{"label": "Rockland"},{"label": "Rockport"},{"label": "Rowe"},{"label": "Rowley"},{"label": "Royalston"},{"label": "Russell"},{"label": "Rutland"},{"label": "Salem"},{"label": "Salisbury"},{"label": "Sandisfield"},{"label": "Sandwich"},{"label": "Saugus"},{"label": "Savoy"},{"label": "Scituate"},{"label": "Seekonk"},{"label": "Sharon"},{"label": "Sheffield"},{"label": "Shelburne"},{"label": "Sherborn"},{"label": "Shirley"},{"label": "Shrewsbury"},{"label": "Shutesbury"},{"label": "Somerset"},{"label": "Somerville"},{"label": "Southampton"},{"label": "Southborough"},{"label": "Southbridge"},{"label": "South Hadley"},{"label": "Southwick"},{"label": "Spencer"},{"label": "Springfield"},{"label": "Sterling"},{"label": "Stockbridge"},{"label": "Stoneham"},{"label": "Stoughton"},{"label": "Stow"},{"label": "Sturbridge"},{"label": "Sudbury"},{"label": "Sunderland"},{"label": "Sutton"},{"label": "Swampscott"},{"label": "Swansea"},{"label": "Taunton"},{"label": "Templeton"},{"label": "Tewksbury"},{"label": "Tisbury"},{"label": "Tolland"},{"label": "Topsfield"},{"label": "Townsend"},{"label": "Truro"},{"label": "Tyngsborough"},{"label": "Tyringham"},{"label": "Upton"},{"label": "Uxbridge"},{"label": "Wakefield"},{"label": "Wales"},{"label": "Walpole"},{"label": "Waltham"},{"label": "Ware"},{"label": "Wareham"},{"label": "Warren"},{"label": "Warwick"},{"label": "Washington"},{"label": "Watertown"},{"label": "Wayland"},{"label": "Webster"},{"label": "Wellesley"},{"label": "Wellfleet"},{"label": "Wendell"},{"label": "Wenham"},{"label": "Westborough"},{"label": "West Boylston"},{"label": "West Bridgewater"},{"label": "West Brookfield"},{"label": "Westfield"},{"label": "Westford"},{"label": "Westhampton"},{"label": "Westminster"},{"label": "West Newbury"},{"label": "Weston"},{"label": "Westport"},{"label": "West Springfield"},{"label": "West Stockbridge"},{"label": "West Tisbury"},{"label": "Westwood"},{"label": "Weymouth"},{"label": "Whately"},{"label": "Whitman"},{"label": "Wilbraham"},{"label": "Williamsburg"},{"label": "Williamstown"},{"label": "Wilmington"},{"label": "Winchendon"},{"label": "Winchester"},{"label": "Windsor"},{"label": "Winthrop"},{"label": "Woburn"},{"label": "Worcester"},{"label": "Worthington"},{"label": "Wrentham"},{"label": "Yarmouth"}];
 
// //setup fuzzy search with autocomplete
// function setupFuzzySearch() {
// 	fuzzySearch({
// 		input: $('.fuzzy-search-auto-input'),
// 		button: $('.fuzzy-search-auto-button'),
// 		data: _fuzzySearchData,
// 		callback: showFuzzySearchAutoResults,
// 		errorElement: $('.fuzzy-search-auto-results'),
// 		autocomplete: true
// 	});	
// }
 
// // fuzzy search js
// function fuzzySearch(params) {
// 	var self = {
// 		distThreshold: 3, //how closely the search needs to match (num chars off)
// 		init: function() {
// 			if(params.autocomplete) {
// 				// BEWARE! this depends on jquery autocomplete lib being loaded
// 				self.setupAutocomplete();
// 			}
 
// 			self.setupButtonEvent();
// 		},
 
// 		setupAutocomplete: function() {
// 			params.input.autocomplete({
// 				source: params.data,
// 				minLength: 3,
// 				select: function(event, ui) {
// 					params.callback(ui.item);
// 					params.input.val(''); 		
// 					return false;
// 				}
// 			});
// 		},
 
// 		setupButtonEvent: function() {
// 			params.button.on('click', function(e) {	
// 				e.preventDefault();
// 				$(this).prev().blur();
// 				var fuzz = params.input.val().trim();
// 				if(fuzz.length > 0) {
// 					var result = self.findMatch(fuzz);
// 					if(result) {
// 						params.callback(result);
// 					} else {
// 						self.displayError(params.errorElement, fuzz);
// 					}
// 				}
// 				params.input.val('');
// 				return false;
// 			});
// 		},
		
// 		findMatch: function(search) {
// 			var bestIndex,
// 				bestScore = 9999;
// 			for (var i = 0; i < params.data.length; i++) {
// 				var score = self.levDist(search, params.data[i].label);
// 				if(score === 0) {
// 					bestIndex = i;
// 					return params.data[bestIndex];
// 				} else if(score < bestScore && score < self.distThreshold) {
// 					bestIndex = i;
// 					bestScore = score;
// 				}
// 			}
// 			return params.data[bestIndex];
// 		},
 
// 		displayError: function(el, fuzz) {
// 			if(el) {
// 				el.empty().text('could not find a match for ' + fuzz);	
// 			}
// 		},
 
// 		levDist: function(e,t) {
// 			// http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau–Levenshtein distance (Wikipedia)
// 			e=e.toLowerCase();t=t.toLowerCase();var n=[];var r=e.length;var i=t.length;if(r===0)return i;if(i===0)return r;for(var s=r;s>=0;s--)n[s]=[];for(var o=r;o>=0;o--)n[o][0]=o;for(var u=i;u>=0;u--)n[0][u]=u;for(var a=1;a<=r;a++){var f=e.charAt(a-1);for(var l=1;l<=i;l++){if(a==l&&n[a][l]>4)return r;var c=t.charAt(l-1);var h=f==c?0:1;var p=n[a-1][l]+1;var d=n[a][l-1]+1;var v=n[a-1][l-1]+h;if(d<p)p=d;if(v<p)p=v;n[a][l]=p;if(a>1&&l>1&&f==t.charAt(l-2)&&e.charAt(a-2)==c){n[a][l]=Math.min(n[a][l],n[a-2][l-2]+h);}}}return n[r][i];
// 		}	
// 	};
 
// 	self.init();
// }
 
// function showFuzzySearchAutoResults(result) {
// 	// DO SOMETHING
// 	console.log(result);
// }
 
// //start er up
// setupFuzzySearch();