(function($){
  $.fn.hyperionize = function(options){
    var defaults = { 
      singleItems : [],
      multipleItems : [],
      pollTimeout : 3000, 
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
        for (var id in options.singleItems){
          params[options.singleItems[id]] = convertValueToFloat($("#" + options.singleItems[id]).val());
        }
        for (var klass in options.multipleItems){
          var collection = new Array();
          var items = $("." + options.multipleItems[klass]);
          $.each(items, function(index,value){
            collection[index] = convertValueToFloat($(value).val());
          });
          params[options.multipleItems[klass]] = collection;
        }
        calculate_total(params);
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


