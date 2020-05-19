!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["datetime-formatter"]=t():e["datetime-formatter"]=t()}(global,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e){return e%400==0||e%100!=0&&e%4==0}function a(e,t){return[31,r(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]}function s(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,s=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){i=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(i)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){var n=t.match(/\\?./g),r="";if(Array.isArray(n)){var o,u=s(n);try{for(u.s();!(o=u.n()).done;){var h=o.value;switch(h){case"d":r+="0".concat(e.day).slice(-2);break;case"D":r+=e.shortDayNames[e.getDayOfWeekIso()-1];break;case"j":r+="".concat(e.day);break;case"l":r+=e.dayNames[e.getDayOfWeekIso()-1];break;case"N":r+=e.toDate().getUTCDay()?e.toDate().getUTCDay():7;break;case"S":"1"==="".concat(e.day).slice(-1)&&"11"!=="".concat(e.day).slice(-2)?r+="st":"2"==="".concat(e.day).slice(-1)&&"12"!=="".concat(e.day).slice(-2)?r+="nd":"3"==="".concat(e.day).slice(-1)&&"13"!=="".concat(e.day).slice(-2)?r+="rd":r+="th";break;case"w":r+="".concat(e.toDate().getUTCDay());break;case"z":for(var c=0,l=0;l<e.month;l++)c+=a(e.year,l);r+="".concat(c+e.day-1);break;case"W":var f=e.clone().setDay(e.day+4-e.getDayOfWeekIso()).diffInDays(e.clone().startOfYear()),y=Math.ceil((f+1)/7);r+="".concat(y<10?0:"").concat(y);break;case"F":r+=e.monthNames[e.month];break;case"m":r+="0".concat(e.month+1).slice(-2);break;case"M":r+=e.shortMonthNames[e.month];break;case"n":r+="".concat(e.month+1);break;case"t":r+="".concat(a(e.year,e.month));break;case"L":r+="".concat(e.isLeapYear()?1:0);break;case"o":case"Y":r+=(e.year<0?"-":"")+"0000".concat(Math.abs(e.year)).slice(-4);break;case"y":r+=(e.year<0?"-":"")+"00".concat(Math.abs(e.year)).slice(-2);break;case"a":r+=e.hours<12?"am":"pm";break;case"A":r+=e.hours<12?"AM":"PM";break;case"B":var d=60*e.hours*60+60*e.minutes+e.seconds-e.offset,m=Math.floor(d/86400*1e3);r+="00".concat(m).slice(-3);break;case"g":r+="".concat(e.hours<13?e.hours:e.hours-12);break;case"G":r+="".concat(e.hours);break;case"h":r+="0".concat(e.hours<13?e.hours:e.hours-12).slice(-2);break;case"H":r+="0".concat(e.hours).slice(-2);break;case"i":r+="0".concat(e.minutes).slice(-2);break;case"s":r+="0".concat(e.seconds).slice(-2);break;case"u":r+="000000".concat(e.microseconds).slice(-6);break;case"v":r+="000000".concat(e.microseconds).slice(-6,-3);break;case"c":r+=i(e,"Y-m-dTH:i:s+00:00");break;case"r":r+=i(e,"D, d M Y H:i:s +0000");break;case"U":r+="".concat(e.toTimestamp());break;default:r+=h}}}catch(e){u.e(e)}finally{u.f()}}return r}function u(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,s=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(o)throw a}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t);var f=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"year",null),l(this,"month",null),l(this,"day",null),l(this,"hours",null),l(this,"minutes",null),l(this,"seconds",null),l(this,"microseconds",null),l(this,"offset",null),l(this,"dayOfWeek",null),l(this,"dayOfYear",null),l(this,"weekOfYear",null),l(this,"leap",null),l(this,"am",null),l(this,"internetTime",null),l(this,"divideHours",null),l(this,"suffix",null),l(this,"daysInMonth",null),l(this,"formatter",void 0),l(this,"format",void 0),l(this,"target",void 0),this.formatter=t,this.format=n,this.target=r}var t,n,r;return t=e,r=[{key:"throwError",value:function(){throw new Error("Date format is not correct")}}],(n=[{key:"handle",value:function(){var e=this.format.match(/\\?./g);if(!Array.isArray(e))throw new Error("Date format is invalid");return this.parseSymbols(e),this.defineDay(),this.defineTimeByInternetTime(),this.toObject()}},{key:"parseSymbols",value:function(e){for(var t=0;t<e.length;t++)this.parseSymbol(e[t])}},{key:"parseSymbol",value:function(t){switch(t){case"d":this.computeNumberValue("day",[/^(0[1-9]|[1-2][0-9]|3[0-1])/]);break;case"D":this.computeIndexValueFromArray("dayOfWeek",this.formatter.shortDayNames,(function(e){return e+1}));break;case"j":this.computeNumberValue("day",[/^([1-2][0-9]|3[0-1])/,/^([1-9])/]);break;case"l":this.computeIndexValueFromArray("dayOfWeek",this.formatter.dayNames,(function(e){return e+1}));break;case"N":this.computeNumberValue("dayOfWeek",[/^([1-7])/]);break;case"S":this.computeValueFromArray("suffix",["st","nd","rd","th"]);break;case"w":this.computeNumberValue("dayOfWeek",[/^([0-6])/],(function(e){return 0===e?7:e}));break;case"z":this.computeNumberValue("dayOfYear",[/^([1-2][0-9]{2}|3[0-5][0-9]|36[0-5])/,/^([1-9][0-9])/,/^([0-9])/]);break;case"W":this.computeNumberValue("weekOfYear",[/^([0-4][0-9]|5[0-2])/]);break;case"F":this.computeIndexValueFromArray("month",this.formatter.monthNames);break;case"m":this.computeNumberValue("month",[/^(0[1-9]|1[0-2])/],(function(e){return e-1}));break;case"M":this.computeIndexValueFromArray("month",this.formatter.shortMonthNames);break;case"n":this.computeNumberValue("month",[/^(1[0-2])/,/^([1-9])/],(function(e){return e-1}));break;case"t":this.computeNumberValue("daysInMonth",[/^(2[8-9]|3[0-1])/]);break;case"L":this.computeNumberValue("leap",[/^([0-1])/],(function(e){return!!e}));break;case"o":case"Y":this.computeNumberValue("year",[/^([0-9]{4})/]);break;case"y":this.computeNumberValue("year",[/^([0-9]{2})/],(function(e){var t=N.now().startOfCentury().subYear().getYear();return e<70?t+e:t-100+e}));break;case"a":this.computeValueFromArray("am",["am","pm"],(function(e){return"am"===e}));break;case"A":this.computeValueFromArray("am",["AM","PM"],(function(e){return"AM"===e}));break;case"B":this.computeNumberValue("internetTime",[/^([0-9]{3})/]);break;case"g":this.computeNumberValue("divideHours",[/^(1[0-2])/,/^([0-9])/]);break;case"G":this.computeNumberValue("hours",[/^(1[0-9]|2[0-3])/,/^([0-9])/]);break;case"h":this.computeNumberValue("divideHours",[/^(0[0-9]|1[0-2])/]);break;case"H":this.computeNumberValue("hours",[/^([0-1][0-9]|2[0-3])/]);break;case"i":this.computeNumberValue("minutes",[/^([0-5][0-9])/]);break;case"s":this.computeNumberValue("seconds",[/^([0-5][0-9])/]);break;case"u":this.computeNumberValue("microseconds",[/^([0-9]{6})/]);break;case"v":this.computeNumberValue("microseconds",[/^([0-9]{3})/],(function(e){return e*Math.pow(10,3)}));break;case"O":this.computeOffset([/^(-)(0[0-9]|1[0-1])([0-5][0-9])/,/^(-)(12)(00)/,/^(\+)(0[0-9]|1[0-3])([0-5][0-9])/,/^(\+)(14)(00)/]);break;case"P":this.computeOffset([/^(-)(0[0-9]|1[0-1]):([0-5][0-9])/,/^(-)(12):(00)/,/^(\+)(0[0-9]|1[0-3]):([0-5][0-9])/,/^(\+)(14):(00)/]);break;case"Z":this.computeOffsetFromSeconds([/^(-(?:43200|43[0-1][0-9]{2}|4[0-2][0-9]{3}|[1-3][0-9]{4}|[1-9][0-9]{0,4}))/,/^(50400|50[0-3][0-9]{2}|[1-4][0-9]{4}|[0-9]{1,4})/]);break;case"c":this.computeFromComplex("Y-m-dTH:i:sP");break;case"r":this.computeFromComplex("D, d M Y H:i:s O");break;case"U":var n=this.target.match(/^([0-9]+)/);if(n){var r=N.createFromTimestamp(Number(n[1]));this.copyDataFromParserOrFormatter(r),this.microseconds=0;break}e.throwError();break;default:this.target=this.target.slice(1)}}},{key:"defineDay",value:function(){if(!this.day){if(this.year){var e=new N(this.year,null===this.month?1:this.month+1,1);if(null!==this.weekOfYear||null!==this.dayOfWeek)null!==this.weekOfYear&&this.weekOfYear>1&&(e.startOfYear(),e.addWeeks(this.weekOfYear-1),e.getFirstDayInYearOnFullWeek()>1&&e.subDay(),e.isLeapYear()&&e.getMonth()>2&&e.subDay()),this.dayOfWeek&&(e.getDayOfWeekIso()>this.dayOfWeek?e.addDays(7-e.getDayOfWeekIso()+this.dayOfWeek):e.getDayOfWeekIso()<this.dayOfWeek&&e.addDays(this.dayOfWeek-e.getDayOfWeekIso()));else if(this.dayOfYear)e.startOfYear().addDays(this.dayOfYear);else if(this.suffix)switch(this.suffix){case"st":e.setDay(1);break;case"nd":e.setDay(2);break;case"rd":e.setDay(3);break;case"th":e.setDay(4)}if(null!==this.month&&e.month!==this.month)throw new Error("Date is invalid");this.month=e.month,this.day=e.day,this.hours=null===this.hours?e.hours:this.hours,this.minutes=null===this.minutes?e.minutes:this.minutes,this.seconds=null===this.seconds?e.seconds:this.seconds}null!==this.am&&null!==this.divideHours&&(this.hours=this.am?this.divideHours:this.divideHours+12)}}},{key:"defineTimeByInternetTime",value:function(){if(null!==this.internetTime&&(null===this.hours||null===this.minutes||null===this.seconds)){var e=function(e){var t=Math.floor(e/60/60),n=60*t*60,r=Math.floor((e-n)/60);return{hours:t,minutes:r,seconds:e-n-60*r}}(Math.floor(86400*this.internetTime/999)),t=e.hours,n=e.minutes,r=e.seconds;this.hours=t+1,this.minutes=n,this.seconds=r}}},{key:"toObject",value:function(){return{year:this.year||N.now().getYear(),month:null===this.month?N.now().getMonth():this.month,day:this.day||1,hours:this.hours||0,minutes:this.minutes||0,seconds:this.seconds||0,microseconds:this.microseconds||0,offset:this.offset||0}}},{key:"computeOffset",value:function(e){var t,n=u(e);try{for(n.s();!(t=n.n()).done;){var r=t.value,a=this.target.match(r);if(a)return this.offset=(60*Number(a[2])+Number(a[3]))*("-"===a[1]?-1:1),this.target=this.target.slice(5),!0}}catch(e){n.e(e)}finally{n.f()}return!1}},{key:"computeOffsetFromSeconds",value:function(t){var n,r=u(t);try{for(r.s();!(n=r.n()).done;){var a=n.value,s=this.target.match(a);if(s)return this.offset=Math.round(Number(s[1])/60),void(this.target=this.target.slice(s[1].length))}}catch(e){r.e(e)}finally{r.f()}e.throwError()}},{key:"computeFromComplex",value:function(t){var n=new e(this.formatter,t,this.target).handle();this.copyDataFromParserOrFormatter(n),this.target=this.target.slice(-1)}},{key:"computeNumberValue",value:function(e,t,n){this.computeValue(e,t,(function(e){var t=Number(e[1]);return"function"==typeof n?n(t):t}))}},{key:"computeIndexValueFromArray",value:function(e,t,n){var r=new RegExp("^(".concat(t.join("|"),")"),"i");this.computeValue(e,[r],(function(e){for(var r=e[1].toLowerCase(),a=0;a<t.length;a++)if(t[a].toLowerCase()===r)return"function"==typeof n?n(a):a;throw new Error("Internal error. Could not find element [".concat(r,"] in array: ").concat(t.join(",")))}))}},{key:"computeValueFromArray",value:function(e,t,n){var r=new RegExp("^(".concat(t.join("|"),")"),"i");this.computeValue(e,[r],(function(e){for(var r=e[1].toLowerCase(),a=0;a<t.length;a++)if(t[a].toLowerCase()===r)return"function"==typeof n?n(t[a]):t[a];throw new Error("Internal error. Could not find element [".concat(r,"] in array: ").concat(t.join(",")))}))}},{key:"computeValue",value:function(t,n,r){var a,s=u(n);try{for(s.s();!(a=s.n()).done;){var o=a.value,i=this.target.match(o);if(i)return this[t]=r(i),void(this.target=this.target.slice(i[1].length))}}catch(e){s.e(e)}finally{s.f()}e.throwError()}},{key:"copyDataFromParserOrFormatter",value:function(e){this.year=e.year,this.month=e.month,this.day=e.day,this.hours=e.hours,this.minutes=e.minutes,this.seconds=e.seconds,this.offset=e.offset}}])&&c(t.prototype,n),r&&c(t,r),e}();function y(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,s=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(o)throw a}}}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e){var t={monthNames:N.globalMonthNames,shortMonthNames:N.globalShortMonthNames,dayNames:N.globalDayNames,shortDayNames:N.globalShortDayNames};if(e.hasOwnProperty("monthNames")&&Array.isArray(e.monthNames)&&12===e.monthNames.length&&(t.monthNames=e.monthNames,!e.hasOwnProperty("shortMonthNames")||!Array.isArray(e.shortMonthNames)||12!==e.shortMonthNames.length)){t.shortMonthNames=[];var n,r=y(e.monthNames);try{for(r.s();!(n=r.n()).done;){var a=n.value;t.shortMonthNames.push(a.slice(0,3))}}catch(e){r.e(e)}finally{r.f()}}if(e.hasOwnProperty("shortMonthNames")&&Array.isArray(e.shortMonthNames)&&12===e.shortMonthNames.length&&(t.shortMonthNames=e.shortMonthNames),e.hasOwnProperty("dayNames")&&Array.isArray(e.dayNames)&&7===e.dayNames.length&&(t.dayNames=e.dayNames,!e.hasOwnProperty("shortDayNames")||!Array.isArray(e.shortDayNames)||7!==e.shortDayNames.length)){t.shortDayNames=[];var s,o=y(e.dayNames);try{for(o.s();!(s=o.n()).done;){var i=s.value;t.shortDayNames.push(i.slice(0,3))}}catch(e){o.e(e)}finally{o.f()}}return e.hasOwnProperty("shortDayNames")&&Array.isArray(e.shortDayNames)&&7===e.shortDayNames.length&&(t.shortDayNames=e.shortDayNames),t}function v(e){return Number(e).toString()===e.toString()}function k(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,s=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(o)throw a}}}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){var n=0;t.length&&Array.isArray(t[0])&&(t=t[0]);var r,a=k(t);try{for(a.s();!(r=a.n()).done;){var s=r.value;v(s)&&(n+=s)}}catch(e){a.e(e)}finally{a.f()}for(var o=e%n,i=0;i<t.length;i++)if(v(t[i])){if(t[i]>o)return i;o-=t[i]}throw new Error("Your periods are empty")}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(e,t,n){return t&&O(e.prototype,t),n&&O(e,n),e}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var N=function(){function e(t,n,r,a,s,o,i){if(M(this,e),w(this,"year",0),w(this,"month",0),w(this,"day",0),w(this,"hours",0),w(this,"minutes",0),w(this,"seconds",0),w(this,"microseconds",0),w(this,"offset",0),w(this,"monthNames",[]),w(this,"shortMonthNames",[]),w(this,"dayNames",[]),w(this,"shortDayNames",[]),this.monthNames=e.globalMonthNames,this.dayNames=e.globalDayNames,this.shortMonthNames=e.globalShortMonthNames,this.shortDayNames=e.globalShortDayNames,1===arguments.length){if(arguments[0]instanceof Date)this.parseFromDate(arguments[0]);else{if(!["string","number"].includes(p(arguments[0]))||Number(arguments[0]).toString()!==arguments[0].toString())throw new Error("Argument #0 [".concat(arguments[0],"] is not correct"));this.parseFromTimestamp(arguments[0])}return this}if(arguments.length>=3){for(var u=0;u<Math.min(arguments.length,7);u++)if(!["string","number"].includes(p(arguments[0]))||Number(arguments[u]).toString()!==arguments[u].toString())throw new Error("Argument #".concat(u," [").concat(arguments[u],"] is not correct"));this.set(arguments[0],arguments[1]-1,arguments[2],arguments[3]||0,arguments[4]||0,arguments[5]||0,arguments[6]||0)}else{if(arguments.length)throw new Error("Arguments are undefined");if(this.parseFromDate(new Date),"object"===("undefined"==typeof process?"undefined":p(process))&&"function"==typeof process.hrtime){var h=process.hrtime();this.microseconds=Math.floor(h[0]*Math.pow(1,6)+h[1]/1e3)}}}return D(e,null,[{key:"now",value:function(){return new e}},{key:"parse",value:function(t){if(t instanceof e)return t;if("string"==typeof t)try{var n=Date.parse(t);if(!isNaN(n))return new e(new Date(t))}catch(e){}else{if(t instanceof Date)return new e(t);if("number"==typeof t)return new e(t)}throw new Error("Invalid date")}},{key:"createFromFormat",value:function(t,n){var r=new e,a=new f(r,t,n).handle();return r.year=a.year,r.month=a.month,r.day=a.day,r.hours=a.hours,r.minutes=a.minutes,r.seconds=a.seconds,r.microseconds=a.microseconds,r}},{key:"setGlobalTranslations",value:function(t){var n=m(t);e.globalMonthNames=n.monthNames,e.globalShortMonthNames=n.shortMonthNames,e.globalDayNames=n.dayNames,e.globalShortDayNames=n.shortDayNames}},{key:"createFromTimestamp",value:function(t){var n=new e;return n.parseFromTimestamp(t),n}},{key:"createFromDate",value:function(t){return(new e).parseFromDate(t)}}]),D(e,[{key:"addSecond",value:function(){return this.addSeconds(1)}},{key:"addSeconds",value:function(e){return this.add(0,0,0,0,0,e)}},{key:"addMinute",value:function(){return this.addMinutes(1)}},{key:"addMinutes",value:function(e){return this.add(0,0,0,0,e)}},{key:"addHour",value:function(){return this.addHours(1)}},{key:"addHours",value:function(e){return this.add(0,0,0,e)}},{key:"addDay",value:function(){return this.addDays(1)}},{key:"addDays",value:function(e){return this.add(0,0,e)}},{key:"addWeek",value:function(){return this.addDays(7)}},{key:"addWeeks",value:function(e){return this.addDays(7*e)}},{key:"addMonth",value:function(){return this.addMonths(1)}},{key:"addMonths",value:function(e){return this.add(0,e)}},{key:"addYear",value:function(){return this.addYears(1)}},{key:"addYears",value:function(e){return this.add(e)}},{key:"addDecade",value:function(){return this.addYears(10)}},{key:"addDecades",value:function(e){return this.addYears(10*e)}},{key:"addCentury",value:function(){return this.addYears(100)}},{key:"addCenturies",value:function(e){return this.addYears(100*e)}},{key:"subSecond",value:function(){return this.addSeconds(-1)}},{key:"subSeconds",value:function(e){return this.addSeconds(-1*e)}},{key:"subMinute",value:function(){return this.addMinutes(-1)}},{key:"subMinutes",value:function(e){return this.addMinutes(-1*e)}},{key:"subHour",value:function(){return this.addHours(-1)}},{key:"subHours",value:function(e){return this.addHours(-1*e)}},{key:"subDay",value:function(){return this.addDays(-1)}},{key:"subDays",value:function(e){return this.addDays(-1*e)}},{key:"subWeek",value:function(){return this.addDays(-7)}},{key:"subWeeks",value:function(e){return this.addDays(-7*e)}},{key:"subMonth",value:function(){return this.addMonths(-1)}},{key:"subMonths",value:function(e){return this.addMonths(-1*e)}},{key:"subYear",value:function(){return this.addYears(-1)}},{key:"subYears",value:function(e){return this.addYears(-1*e)}},{key:"subDecade",value:function(){return this.subYears(10)}},{key:"subDecades",value:function(e){return this.subYears(10*e)}},{key:"subCentury",value:function(){return this.subYears(100)}},{key:"subCenturies",value:function(e){return this.subYears(100*e)}},{key:"toDateString",value:function(){return i(this,"Y-m-d")}},{key:"toDateTimeString",value:function(){return i(this,"Y-m-d H:i:s")}},{key:"toJsTimestamp",value:function(){return this.toDate().getTime()}},{key:"toTimestamp",value:function(){return Math.floor(this.toDate().getTime()/1e3)}},{key:"toDate",value:function(){return new Date(Date.UTC(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,Math.floor(this.microseconds/1e3)))}},{key:"clone",value:function(){var t=new e;return t.year=this.year,t.month=this.month,t.day=this.day,t.hours=this.hours,t.minutes=this.minutes,t.seconds=this.seconds,t.microseconds=this.microseconds,t.dayNames=this.dayNames,t.shortDayNames=this.shortDayNames,t.monthNames=this.monthNames,t.shortMonthNames=this.shortMonthNames,t}},{key:"diffInMicroseconds",value:function(e){var t=Math.pow(10,3),n=e.toJsTimestamp()*t+e.getMicroseconds()%t,r=this.toJsTimestamp()*t+this.getMicroseconds()%t;return Math.abs(n-r)}},{key:"diffInMilliseconds",value:function(e){return Math.abs(e.toJsTimestamp()-this.toJsTimestamp())}},{key:"diffInSeconds",value:function(e){return Math.abs(e.toTimestamp()-this.toTimestamp())}},{key:"diffInMinutes",value:function(e){return Math.floor(this.diffInSeconds(e)/60)}},{key:"diffInHours",value:function(e){return Math.floor(this.diffInMinutes(e)/60)}},{key:"diffInDays",value:function(e){return Math.floor(this.diffInHours(e)/24)}},{key:"diffInMonths",value:function(e){return 12*this.diffInYears(e)+Math.abs(e.month-this.month)}},{key:"diffInYears",value:function(e){return Math.abs(e.year-this.year)}},{key:"diffInDecades",value:function(e){return Math.floor(this.diffInYears(e)/10)}},{key:"diffInCenturies",value:function(e){return Math.floor(this.diffInYears(e)/100)}},{key:"format",value:function(e){return i(this,e)}},{key:"startOfMillisecond",value:function(){return this.microseconds-=this.microseconds%Math.pow(10,3),this}},{key:"startOfSecond",value:function(){return this.microseconds=0,this}},{key:"startOfMinute",value:function(){return this.seconds=0,this.startOfSecond()}},{key:"startOfHour",value:function(){return this.minutes=0,this.startOfMinute()}},{key:"startOfDay",value:function(){return this.hours=0,this.startOfHour()}},{key:"startOfWeek",value:function(){return this.startOfDay(),this.subDays(this.getDayOfWeekIso()-1),this}},{key:"startOfMonth",value:function(){return this.day=1,this.startOfDay()}},{key:"startOfHalfYear",value:function(){return this.subMonths(this.month%6).startOfMonth()}},{key:"startOfYear",value:function(){return this.month=0,this.startOfMonth()}},{key:"startOfDecade",value:function(){return this.subYears(this.year%10).startOfYear()}},{key:"startOfCentury",value:function(){return this.subYears(this.year%100-1).startOfYear()}},{key:"endOfMillisecond",value:function(){return this.microseconds=999e3+this.microseconds%Math.pow(10,3),this}},{key:"endOfSecond",value:function(){return this.microseconds=999999,this}},{key:"endOfMinute",value:function(){return this.seconds=59,this.endOfSecond()}},{key:"endOfHour",value:function(){return this.minutes=59,this.endOfMinute()}},{key:"endOfDay",value:function(){return this.hours=23,this.endOfHour()}},{key:"endOfWeek",value:function(){return this.endOfDay().addDays(7-this.getDayOfWeekIso())}},{key:"endOfMonth",value:function(){return this.day=a(this.year,this.month),this.endOfDay()}},{key:"endOfHalfYear",value:function(){return this.startOfHalfYear().addMonths(6).endOfMonth()}},{key:"endOfYear",value:function(){return this.month=11,this.endOfMonth()}},{key:"endOfDecade",value:function(){return this.startOfDecade().addYears(9).endOfYear()}},{key:"endOfCentury",value:function(){return this.startOfCentury().addYears(99).endOfYear()}},{key:"isFuture",value:function(){return this.toTimestamp()-e.now().toTimestamp()>0}},{key:"isLeapYear",value:function(){return r(this.year)}},{key:"isPast",value:function(){return e.now().toTimestamp()-this.toTimestamp()>0}},{key:"isNextMonth",value:function(){var t=e.now();return!(11!==t.month||!this.isNextYear()||0!==this.month)||this.year===t.year&&t.month===this.month-1}},{key:"isNextYear",value:function(){return e.now().year===this.year-1}},{key:"isPrevMonth",value:function(){var t=e.now();return!(0!==t.month||!this.isPrevYear()||11!==this.month)||t.year===this.year&&t.month===this.month+1}},{key:"isPrevYear",value:function(){return e.now().year===this.year+1}},{key:"isToday",value:function(){var t=e.now();return t.year===this.year&&t.month===this.month&&t.day===this.day}},{key:"isTomorrow",value:function(){var t=e.now();return t.day===a(t.year,t.month)?this.isNextMonth()&&1===this.day:t.year===this.year&&t.month===this.month&&t.day===this.day-1}},{key:"isYesterday",value:function(){var t=e.now();return 1===t.day?this.isPrevMonth()&&this.day===a(this.year,this.month):t.year===this.year&&t.month===this.month&&t.day===this.day+1}},{key:"isCurrentMicrosecond",value:function(){var t=e.now();return this.isCurrentSecond()&&this.getMicroseconds()===t.getMicroseconds()}},{key:"isCurrentMillisecond",value:function(){var t=e.now();return this.isCurrentSecond()&&this.getMilliseconds()===t.getMilliseconds()}},{key:"isCurrentSecond",value:function(){return this.notEqualWithoutMilliseconds(e.now())}},{key:"isCurrentMinute",value:function(){return this.notEqualWithoutSeconds(e.now())}},{key:"isCurrentHour",value:function(){return this.notEqualWithoutMinutes(e.now())}},{key:"isCurrentDay",value:function(){return this.notEqualWithoutHours(e.now())}},{key:"isCurrentMonth",value:function(){return this.notEqualWithoutDays(e.now())}},{key:"isCurrentYear",value:function(){return this.notEqualWithoutMonths(e.now())}},{key:"isCurrentDecade",value:function(){var t=e.now();return this.getYear()>=t.startOfDecade().getYear()&&this.getYear()<=t.endOfDecade().getYear()}},{key:"isCurrentCentury",value:function(){var t=e.now();return this.getYear()>=t.startOfCentury().getYear()&&this.getYear()<=t.endOfCentury().getYear()}},{key:"isJanuary",value:function(){return 1===this.getMonth()}},{key:"isFebruary",value:function(){return 2===this.getMonth()}},{key:"isMarch",value:function(){return 3===this.getMonth()}},{key:"isApril",value:function(){return 4===this.getMonth()}},{key:"isMay",value:function(){return 5===this.getMonth()}},{key:"isJune",value:function(){return 6===this.getMonth()}},{key:"isJuly",value:function(){return 7===this.getMonth()}},{key:"isAugust",value:function(){return 8===this.getMonth()}},{key:"isSeptember",value:function(){return 9===this.getMonth()}},{key:"isOctober",value:function(){return 10===this.getMonth()}},{key:"isNovember",value:function(){return 11===this.getMonth()}},{key:"isDecember",value:function(){return 12===this.getMonth()}},{key:"getMicroseconds",value:function(){return this.microseconds}},{key:"getMilliseconds",value:function(){return Math.floor(this.microseconds/1e3)}},{key:"getSeconds",value:function(){return this.seconds}},{key:"getMinutes",value:function(){return this.minutes}},{key:"getHours",value:function(){return this.hours}},{key:"getDay",value:function(){return this.day}},{key:"getMonth",value:function(){return this.month+1}},{key:"getYear",value:function(){return this.year}},{key:"setMicroseconds",value:function(e){return this.set(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,e)}},{key:"setMilliseconds",value:function(e){return this.set(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,1e3*e)}},{key:"setSeconds",value:function(e){return this.set(this.year,this.month,this.day,this.hours,this.minutes,e,this.microseconds)}},{key:"setMinutes",value:function(e){return this.set(this.year,this.month,this.day,this.hours,e,this.seconds,this.microseconds)}},{key:"setHours",value:function(e){return this.set(this.year,this.month,this.day,e,this.minutes,this.seconds,this.microseconds)}},{key:"setDay",value:function(e){return this.set(this.year,this.month,e,this.hours,this.minutes,this.seconds,this.microseconds)}},{key:"setMonth",value:function(e){return this.set(this.year,e,this.day,this.hours,this.minutes,this.seconds,this.microseconds)}},{key:"setYear",value:function(e){return this.set(e,this.month,this.day,this.hours,this.minutes,this.seconds,this.microseconds)}},{key:"getFirstDayInYearOnFullWeek",value:function(){return e=this.year,1===(t=new Date(e,0,1).getDay()||0)?1:0===t?2:9-t;var e,t}},{key:"getCountDaysInMonth",value:function(){return a(this.year,this.month)}},{key:"getDayOfWeek",value:function(){return this.toDate().getDay()}},{key:"getDayOfWeekIso",value:function(){return this.toDate().getUTCDay()||7}},{key:"setTranslations",value:function(e){var t=m(e);return this.monthNames=t.monthNames,this.shortMonthNames=t.shortMonthNames,this.dayNames=t.dayNames,this.shortDayNames=t.shortDayNames,this}},{key:"equal",value:function(t){var n=e.parse(t);return this.equalWithoutMicroseconds(n)&&this.microseconds===n.microseconds}},{key:"equalWithoutMicroseconds",value:function(t){var n=e.parse(t);return this.equalWithoutSeconds(n)&&this.seconds===n.seconds&&this.getMilliseconds()===n.getMilliseconds()}},{key:"equalWithoutMilliseconds",value:function(t){var n=e.parse(t);return this.equalWithoutSeconds(n)&&this.seconds===n.seconds}},{key:"equalWithoutSeconds",value:function(t){var n=e.parse(t);return this.equalWithoutMinutes(n)&&this.minutes===n.minutes}},{key:"equalWithoutMinutes",value:function(t){var n=e.parse(t);return this.equalWithoutHours(n)&&this.hours===n.hours}},{key:"equalWithoutHours",value:function(t){var n=e.parse(t);return this.equalWithoutDays(n)&&this.day===n.day}},{key:"equalWithoutDays",value:function(t){var n=e.parse(t);return this.equalWithoutMonths(n)&&this.month===n.month}},{key:"equalWithoutMonths",value:function(t){var n=e.parse(t);return this.year===n.year}},{key:"notEqual",value:function(e){return!this.equal(e)}},{key:"notEqualWithoutMicroseconds",value:function(e){return!this.equalWithoutMicroseconds(e)}},{key:"notEqualWithoutMilliseconds",value:function(e){return!this.equalWithoutMilliseconds(e)}},{key:"notEqualWithoutSeconds",value:function(e){return!this.equalWithoutSeconds(e)}},{key:"notEqualWithoutMinutes",value:function(e){return!this.equalWithoutMinutes(e)}},{key:"notEqualWithoutHours",value:function(e){return!this.equalWithoutHours(e)}},{key:"notEqualWithoutDays",value:function(e){return!this.equalWithoutDays(e)}},{key:"notEqualWithoutMonths",value:function(e){return!this.equalWithoutMonths(e)}},{key:"getDayOfYear",value:function(){for(var e=0,t=0;t<this.month;t++)e+=a(this.year,t);return e+this.day}},{key:"getIndexOfMicrosecondPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.diffInMicroseconds(e),n)}},{key:"getIndexOfMillisecondPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfMillisecond().diffInMilliseconds(e.clone().startOfMillisecond()),n)}},{key:"getIndexOfSecondPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfSecond().diffInSeconds(e.clone().startOfSecond()),n)}},{key:"getIndexOfMinutePeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfMinute().diffInMinutes(e.clone().startOfMinute()),n)}},{key:"getIndexOfHourPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfHour().diffInHours(e.clone().startOfHour()),n)}},{key:"getIndexOfDayPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfDay().diffInDays(e.clone().startOfDay()),n)}},{key:"getIndexOfMonthPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfMonth().diffInMonths(e.clone().startOfMonth()),n)}},{key:"getIndexOfYearPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfYear().diffInYears(e.clone().startOfYear()),n)}},{key:"getIndexOfDecadePeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfDecade().diffInDecades(e.clone().startOfDecade()),n)}},{key:"getIndexOfCenturyPeriodOnWhichDateIsIncluded",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return g(this.clone().startOfCentury().diffInCenturies(e.clone().startOfCentury()),n)}},{key:"getPreciseTimestamp",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;if(e>6)throw new Error("The precision may not be greater than 6.");if(e<0)throw new Error("The precision must be at least :min.");return Math.floor((this.toTimestamp()*Math.pow(10,6)+this.microseconds)/Math.pow(10,6-e))}},{key:"greaterThan",value:function(e){return this.getPreciseTimestamp()>e.getPreciseTimestamp()}},{key:"greaterThanOrEqualTo",value:function(e){return this.getPreciseTimestamp()>=e.getPreciseTimestamp()}},{key:"lessThan",value:function(e){return this.getPreciseTimestamp()<e.getPreciseTimestamp()}},{key:"lessThanOrEqualTo",value:function(e){return this.getPreciseTimestamp()<=e.getPreciseTimestamp()}},{key:"parseFromDate",value:function(e){return this.year=e.getFullYear(),this.month=e.getMonth(),this.day=e.getDate(),this.hours=e.getHours(),this.minutes=e.getMinutes(),this.seconds=e.getSeconds(),this.microseconds=e.getMilliseconds()*Math.pow(10,3),this.offset=e.getTimezoneOffset(),this}},{key:"parseFromUTCDate",value:function(e){return this.year=e.getUTCFullYear(),this.month=e.getUTCMonth(),this.day=e.getUTCDate(),this.hours=e.getUTCHours(),this.minutes=e.getUTCMinutes(),this.seconds=e.getUTCSeconds(),this.microseconds=e.getUTCMilliseconds()*Math.pow(10,3),this.offset=0,this}},{key:"parseFromTimestamp",value:function(e){var t="".concat(e),n=0;if(e%1!=0){var r="".concat(e).split(".").reverse()[0].length;e*=Math.pow(10,r),t="".concat(e)}if(t.length>=16){var a=e/Math.pow(10,6);e=Math.floor(a)*Math.pow(10,3),n=a%1==0?0:parseInt("".concat(a).split(".").reverse()[0])}else if(t.length>=13){var s=e/Math.pow(10,3);n=s%1==0?0:parseInt("".concat(s).split(".").reverse()[0])*Math.pow(10,3)}else t.length>=10?(e*=Math.pow(10,3),n=0):n=0;return this.parseFromUTCDate(new Date(e)),this.microseconds=n,this}},{key:"add",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;return this.set(this.year+e,this.month+t,this.day+n,this.hours+r,this.minutes+a,this.seconds+s,this.microseconds)}},{key:"set",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,i=o%Math.pow(10,6);return s+=(o-i)/Math.pow(10,6),this.parseFromUTCDate(new Date(Date.UTC(e,t,n,r,a,s))),e<100&&(this.year=e),this.microseconds=i,this}}]),e}();w(N,"globalMonthNames",["January","February","March","April","May","June","July","August","September","October","November","December"]),w(N,"globalShortMonthNames",["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),w(N,"globalDayNames",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),w(N,"globalShortDayNames",["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]);t.default=N}])}));