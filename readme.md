jQuery floating shepherd 
=

<i>I am still new to javascript so my code is very C# flavored and I welcome any feedback. </i> 

about
--

floating shepherd is a plugin used to monitor a multiple input fields and divs for changes and pass their values to function. 


parameters
--


      singleItems : [],
      multipleItems : [],
      callback : null,
      pollTimeout : 2000, 
      convertEmptyToZero : true,
      convertInvalidToZero : true



* <b>singleItems</b> an array of the id's of fields and divs to monitor
* <b>multipleItems</b> an array of the classes of fields or divs to monitor
* <b>callback</b> the function to pass the values to when a value changes
* <b>pollTimeout</b>  the amount of time to wait before triggering a callback
* <b>convertEmptyToZero</b>  if true and a field is empty, a zero will be passed to the callback instead of `NaN`
* <b>convertInvalidToZero</b> if true and an invalid value is found in a field, a zero will be passed to he callback instead of `NaN`


how to use
--

 
      $(function(){
        $(document).observe_items({
          singleItems:["multiply", "divisor"],
          multipleItems:["add","subtract"], 
          callback : calculate_total
        });
      });





