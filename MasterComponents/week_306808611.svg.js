

//this function is called on view loaded
//you can put all your initialization code here
//parameter svg is the SVG Document
//parameter component is the Component element
//parameter properties are the componens' properties
//parameter values are filled in values in properties for type object
 function Compprefix_id__init(svg,component,properties,values){
     $(component).click(function(){
         Compprefix_id__SetDate();
    });
     $(component).css('cursor', 'pointer'); //mouse over
     var set=properties.list[6].value;
     if (set==1)
     {
          Compprefix_id__SetDate();
          myscada.setVisibleOn('prefix_id_rect0002');
     }
 }
function Compprefix_id__SetDate(){
   var cas = new Date();
                   var cas = new Date();
           cas.setHours(0);
           cas.setMinutes(0);
           cas.setSeconds(0);
           cas.setMilliseconds(0);
           while (cas.getDay() != 1) {
               cas.setDate(cas.getDate()-1);
           }
           myscada.dateFrom = Math.round(cas/1000);
           cas.setDate(cas.getDate()+7);
           cas = new Date(cas.getTime()-1000); //-1000
           myscada.dateTo = Math.round(cas/1000);
}
 //This funcion is called each time
 //new data are avaiable
 function Compprefix_id__animate(data){


 }

