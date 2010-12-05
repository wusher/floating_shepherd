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
          doConvertEmptyToZero = options.convertValueToFloat && (value || value.length <= 0);
          if (doConvertEmptyToZero){
            result = 0;
          } else if (options.convertInvalidToZero) {
            result = 0;
          }
        }
        return result; 
      };
      // returns the value in the field/div
      var getSingleValue = function(id){
        var item;
        item = $("input#" + id);
        if (item.length > 0) {
          return convertValueToFloat(item.val());  
        } else {
          item = $("div#" + id);
          return convertValueToFloat(item.text());
        }
      };
      // returns a collection of the values of the arrays
      var getMultipleValues = function(klass){
        var collection = new Array();
        var items = $("input." + klass);
        if (items.size() > 0) {
          //store the value for each field found
          $.each(items, function(index,value){
            collection[index] = convertValueToFloat($(value).val());
          });
        } else {
          items = $("div." + klass);
          //store the value for each div found
          $.each(items, function(index,value){
            collection[index] = convertValueToFloat($(value).text());
          });
        }
        return collection;
      };

      //build functions 
      var onValuesChanged = function () {
        var params = new Array();
        //get the value for each single item field
        for (var id in options.singleItems){
          var htmlId = options.singleItems[id]; 
          params[htmlId] = getSingleValue(htmlId);
        }
        //get the value for each multiple item 
        for (var klass in options.multipleItems){
          var htmlClass = options.multipleItems[klass];
          params[htmlClass] = getMultipleValues(htmlClass);
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
      //at the end start the polling  
      pollForChanges();
    });
  };
})(jQuery);


