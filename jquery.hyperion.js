(function($){
  $.fn.hyperionize = function(options){
    var defaults = { 
      singleItems : [],
      multipleItems : [],
      pollTimeout : 3000
    };
    var options = $.extend(defaults,options);

    return this.each(function () {
      //build functions 
      var onValuesChanged = function () {
        var params = new Array();
        for (var id in options.singleItems){
          params[options.singleItems[id]] = parseFloat($("#" + options.singleItems[id]).val());
        }
        for (var klass in options.multipleItems){
          var collection = new Array();
          var items = $("." + options.multipleItems[klass]);
          $.each(items, function(index,value){
            collection[index] = parseFloat($(value).val());
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


