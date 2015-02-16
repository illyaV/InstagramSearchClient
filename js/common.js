'use strict';

define([], function () {
	return {
		
  getTime: function(time) {
    var result = "",
        h = 1,
        grad = [
          {
          	rank: 60,
          	caption: "second",
          	capt:    "sec."
          },{
          	rank: 60,
          	caption: "minute",
          	capt:    "min."
          },{
          	rank: 24,
            caption: "hour",
            capt:    "h."
          },{
          	rank: 7,
            caption: "day",
            capt:    "d."
          },{
          	rank: 4,
            caption: "week",
            capt:    "w."
          },{
          	rank: 12,
            caption: "month",
            capt:    "m."
          },{
          	rank: 100,
            caption: "year",
            capt:    "y."
          }];
    
    time = Math.round((new Date().getTime() -  time*1000)/1000);
    
    if (time < 0) {
      return 'now';
    }

    for (var i = 0, l = grad.length; i < l; i++ ) {
      h *= grad[i].rank;
      
      if (time < h) {
        h = h/grad[i].rank;      
        
        if (Math.round(time/h) == 1) {
          result = Math.round(time/h) + " " + grad[i].caption;
        } else {
          result = Math.round(time/h) + " " + grad[i].capt;
        }
        break;
      }
    }
    result += " ago";
    return result;
  },
		ENTER_KEY: 13
	};
});