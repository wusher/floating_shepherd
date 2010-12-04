(function($){

  $.fn.observe_items = function(options){
    var defaults = { 
      singleItems : [],
      multipleItems : [],
      callback : null,
      pollTimeout : 2000, 
      convertEmptyToZero : true,
      convertInvalidToZero : true
    };

    var options = $.extend(defaults,options);

    return this.each(function () {
      
      var convertValueToFloat = function(value){
        var result = parseFloat(value);
        if (isNaN(result)){
          if (options.convertValueToFloat && (value || value.length <= 0)){
            result = 0
          } else if (options.convertInvalidToZero) {
            result = 0
          }
        }
        return result; 
      };

      //build functions 
      var onValuesChanged = function () {
        var params = new Array();
        //get the value for each single item field
        for (var id in options.singleItems){
          var htmlId = options.singleItems[id]; 
          var item = $("input#" + htmlId);
          if (item.length > 0 ){
            params[htmlId] = convertValueToFloat(item.val());
          } else  {
            var divItem = $("div#" + htmlId);
            if (divItem.length > 0 ){
              params[htmlId] = convertValueToFloat(divItem.text());
            }
          }
        }
        //get the value for each multiple item 
        for (var klass in options.multipleItems){
          var htmlClass = options.multipleItems[klass];
          var collection = new Array();
          var items = $("input." + htmlClass);
          if (items.size() > 0) {
            //store the value for each field found
            $.each(items, function(index,value){
              collection[index] = convertValueToFloat($(value).val());
            });
            params[htmlClass] = collection;
          }
        }
        //get the value for each multiple item 
        for (var klass in options.multipleItems){
          var htmlClass = options.multipleItems[klass];
          var collection = new Array();
          var items = $("div." + htmlClass);
          //store the value for each field found
          if (items.size() > 0) {
            $.each(items, function(index,value){
              collection[index] = convertValueToFloat($(value).text());
            });
            params[htmlClass] = collection;
          }
        }
        if (options.callback != null) {
          options.callback(params);
        }
      };

      var pollForChanges = function () {
        onValuesChanged();
        setTimeout(pollForChanges, options.pollTimeout);
      };

      // set up on change events 
      for (var id in options.singleItems){
        $("#" + options.singleItems[id]).change(onValuesChanged());
      }
      for (var klass in options.multipleItems){
        $("." + options.multipleItems[klass]).change(onValuesChanged());
      }

      //at the end call the function
      pollForChanges();
    });
  };
})(jQuery);


