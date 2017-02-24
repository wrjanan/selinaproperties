/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$(this).closest('.collapse').collapse('toggle');
});






// video layer
var browserHeight;
var spVideoState = true;
function toggleVideo(state) {
	// if state == 'hide', hide. Else: show video

	//spVideoState = !spVideoState;
	var div = document.getElementById("popupVid");
	var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
	//div.style.display = state == 'hide' ? 'none' : '';
	func = state == false ? 'pauseVideo' : 'playVideo';
	iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}


// bootstrap animations
$(document).ready(function() {
	browserHeight = $(window).height();

	document.getElementById("header").style.height = (browserHeight) + "px";

	new WOW().init();

})


// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function updatePosition() {
	// add your code to update the position when your browser
	// is resized or scrolled
	var vidPosition = getPosition(document.getElementById('popupVid'));

	if(vidPosition.y < (-browserHeight)) {
		toggleVideo(false);
	} else {
		toggleVideo(true);
	}
}

// Helper function to get an element's exact position
function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}


// page interactions
function swapPhotos(el) {
	var secPhoto = el.parentElement.firstElementChild;
	var secPhotoImg = el.parentElement.firstElementChild.attributes.src.value;
	var mainPhoto = el.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
	var mainPhotoImg = el.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.attributes.src.value;

	secPhoto.attributes.src.value = mainPhotoImg;
	mainPhoto.attributes.src.value = secPhotoImg;

	secPhoto.nextSibling.nextSibling.firstElementChild.textContent = mainPhoto.attributes.alt.value;

	var tempAltVal = secPhoto.attributes.alt.value;
	secPhoto.attributes.alt.value = mainPhoto.attributes.alt.value;
	mainPhoto.attributes.alt.value = tempAltVal;
}


// page interactions
var propertyNo = 0;
	var propertyCase = $("#jan");
function swapShowcase(el, next) {
	//next is boolean where true = next
	if(next) {

		propertyNo++;
		if(propertyNo >= properties.length){
			propertyNo=0;
		}

	} else {
		propertyNo--;
		if(propertyNo < 0){
			propertyNo= properties.length-1;
		}
	}
	
	propertyCase.fadeOut(function() {
		var mainTitle = propertyCase.children().children().children("h3");
		var mainPhoto = propertyCase.children().children().children().children()[0];
		var secPhotos = propertyCase.children().children().children().children().children("img");
		var secPhotosAlts = propertyCase.children().children().children().children().children().children("p");

		mainPhoto.attributes.src.value = properties[propertyNo].Photos[0].imageUrl;
		mainPhoto.attributes.alt.value = properties[propertyNo].Photos[0].imageAlt;

		var tempPhotoNo = 0;
		while(tempPhotoNo < properties[propertyNo].Photos.length-1) {

			secPhotos[tempPhotoNo].attributes.src.value = properties[propertyNo].Photos[tempPhotoNo+1].imageUrl;
			secPhotos[tempPhotoNo].attributes.alt.value = properties[propertyNo].Photos[tempPhotoNo+1].imageAlt;
			secPhotosAlts[tempPhotoNo].innerHTML = properties[propertyNo].Photos[tempPhotoNo+1].imageAlt;
			tempPhotoNo++;
		}

		mainTitle[0].innerHTML = properties[propertyNo].Title;
		
		console.log(properties[propertyNo].Size);
		console.log($("#sp-size").text());
		$("#sp-size").html(properties[propertyNo].Size);
		$("#sp-facilities").html(properties[propertyNo].Facilities);
		$("#sp-location").html(properties[propertyNo].Location);
		$("#sp-experience").html(properties[propertyNo].Experience);
		
		
		propertyCase.fadeIn();

		
	});
}



var properties = [{ Title: "Parc Emily Condo",
				   Size: "1098 sq ft",
				   Facilities: "Ground floor unit with balcony, 2 Bedrooms, Full Facilities",
				   Location: "5 mins <u>walk</u> to Little India, 15 mins <u>walk</u> to Douby gauht MRT.",
				   Experience: "Cosy and beautiful condition, with windy breeze especially during the sun set and past midnight.",
				   Price : 1900000,
				   Photos : [{ imageAlt: "Living Room",
							  imageUrl: "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-0/p600x600/16406773_639169349599898_2330990487923139587_n.jpg?oh=a13393aee62200b54354146847e5b451&oe=58FE34A2"},
							 { imageAlt: "Kitchen",
							  imageUrl: "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-0/p600x600/16472907_639169386266561_931370197489786324_n.jpg?oh=88d66dd15bcbc3c813881f1aa8667f08&oe=5942B454"},
							 { imageAlt: "Facilities",
							  imageUrl: "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-0/p600x600/16508882_639169412933225_630981703635766773_n.jpg?oh=d66c2bf59fa78f2a4c57c7b9f11c90bb&oe=592FD2B4"},
							 { imageAlt: "Balcony",
							  imageUrl: "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-0/p600x600/16508933_639169329599900_9109052621181550416_n.jpg?oh=08ec0b3c668869fdb4d8b07ef6e710cb&oe=592C3C02"}
							]
				  },
				  { Title: "Palm Garden Condo",
				   Size: "3+1 size 1216 sq ft ",
				   Facilities: "High floor, clear and unblocked view, full facilities, private lift to home.",
				   Location: "5 mins <u>walk</u> to Little India, 15 mins <u>walk</u> to Douby gauht MRT.",
				   Experience: "Cosy and beautiful condition, with windy breeze especially during the sun set and past midnight.",
				   Price : 880000,
				   Photos : [{ imageAlt: "Living Room",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16711935_643397085843791_6389602662220451393_n.jpg?oh=7229405e09c1706221b00e0cb3daae1a&oe=5945088C"},
							 { imageAlt: "Dining",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16711517_643397129177120_5765344462308180366_n.jpg?oh=b0b98ea3c542facaaa352ea4085c87d2&oe=5927ECA6"},
							 { imageAlt: "Facilities",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16708735_643397142510452_6144408436822284725_n.jpg?oh=47016ad8ad8aa292a9af68078da28036&oe=59452ADA"},
							 { imageAlt: "Bedroom",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16508360_639173449599488_1778262815318181953_n.jpg?oh=59d7c81a4765e0fa6c2068ea99a273be&oe=5925943A"},
							]
				  },
				  { Title: "River Valley Court",
				   Size: "3+1 bedroom, 1636 sq ft ",
				   Facilities: "High floor, full facilities, sheltered basement carpark.",
				   Location: "5 mins <u>walk</u> to Somerset MRT, 2 mins walk to NTUC grocer.",
				   Experience: "Clean and windy environment situated at the heart of the city are in Singapore",
				   Price : 2100000,
				   Photos : [{ imageAlt: "Living Room",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16473183_639182129598620_7263890673724472402_n.jpg?oh=68b21460aa7da446c05983fedd3804a1&oe=593E95ED"},
							 { imageAlt: "Dining",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16602626_639182152931951_975655581715219398_n.jpg?oh=64b3db479eaec1b0b42c95ced91285c6&oe=592710C7"},
							 { imageAlt: "Dining",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16508991_639182179598615_3377192334542761106_n.jpg?oh=e1205c3e1a9ec80d284d1d7862593dd9&oe=592965C3"},
							 { imageAlt: "Kitchen",
							  imageUrl: "https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-0/p600x600/16641049_639182216265278_3058763110879776808_n.jpg?oh=6b6fdcff95f4ccf80906982c7d91eaf1&oe=5945A239"}
							]
				   
				  }]











// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
	map.setCenter(new google.maps.LatLng(1.307508, 103.881564));
});

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 15,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(1.307508, 103.881564), // New York

		// Disables the default Google Maps UI components
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: false,

		// How you would like to style the map. 
		// This is where you would paste any style found on Snazzy Maps.

	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	map = new google.maps.Map(mapElement, mapOptions);

	// Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
	var image = {
		url: 'https://image.flaticon.com/icons/png/512/33/33622.png',
		size: new google.maps.Size(512, 512),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(50, 50),
		scaledSize: new google.maps.Size(50, 50)

	}
	var myLatLng = new google.maps.LatLng(1.307508, 103.881564);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});
}
