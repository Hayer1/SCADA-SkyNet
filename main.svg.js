function destroy() {
// view hide code

}

function init() {
// initialization code

}

function periodic() {
// periodically triggering code
  if (showMap > 0) {
  	showMap = 0;
  	
	window.gmap_draw = function(){
       var mapProp = {center:new google.maps.LatLng(48.858377, 2.294458),zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP};
  	  map=new google.maps.Map(document.getElementById("DivElement0001"),mapProp);

  	  var marker=new google.maps.Marker({
         position:new google.maps.LatLng(48.858377, 2.294458),
         animation:google.maps.Animation.BOUNCE
  	  });
  	  //var map=document.getElementById("aaa");
       marker.setMap(map);
     };

     var script = document.createElement('script');
     script.src = "http://maps.google.com/maps/api/js?sensor=true&callback=gmap_draw";
     document.head.appendChild(script); 
  }  
}

