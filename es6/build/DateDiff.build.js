"use strict";

window.onload = function () {
  var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var checkYear = function checkYear(y) {
    if (y % 4 == 0) {
      if (y % 100 == 0) {
        if (y % 400 == 0) {
          return true;
        } else return false;
      } else return true;
    } else return false;
  };

  document.getElementById("btnsub").addEventListener('click', function () {
    var d1 = document.getElementById("fdate").value;
    var t1 = document.getElementById("ftime").value;
    var d2 = document.getElementById("tdate").value;
    var t2 = document.getElementById("ttime").value;
    var y1 = d1.substring(0, 4);
    var y2 = d2.substring(0, 4);
    var year = parseInt(y2) - parseInt(y1);
    var month = 0;
    var days = 0;
    var hr = 0;
    var min = 0;
    var sec = 0;
    var m1 = d1.substring(5, 7);
    var m2 = d2.substring(5, 7);

    if (m1 > m2) {
      year -= 1;
      month = 12 - parseInt(m1);
      month += parseInt(m2);
    } else month = parseInt(m2) - parseInt(m1);

    var da1 = d1.substring(8, 10);
    var da2 = d2.substring(8, 10);

    if (checkYear(y2)) {
      if (m2 - 1 == 2) {
        console.log("True");
      }
    }

    if (da1 > da2) {
      month -= 1;
      days = arr[(m2 - 2) % 11] - parseInt(da1);
      console.log(m2 - 1, days);
      days += parseInt(da2);
    } else days = parseInt(da2) - parseInt(da1);

    var h1 = t1.substring(0, 2);
    var h2 = t2.substring(0, 2);

    if (h1 > h2) {
      days -= 1;
      hr = 24 - parseInt(h1);
      hr += parseInt(h2);
    } else {
      hr = parseInt(h2) - parseInt(h1);
    }

    var mi1 = t1.substring(3, 5);
    var mi2 = t2.substring(3, 5);

    if (mi1 > mi2) {
      hr -= 1;
      min = 60 - parseInt(mi1);
      min += parseInt(mi2);
    } else {
      min = parseInt(mi2) - parseInt(mi1);
    }

    document.getElementById("show").innerText = "The Differnce is :- ".concat(year, " years ").concat(month, " months ").concat(days, " days ").concat(hr, " hours ").concat(min, " minutes and ").concat(sec, " seconds");
  }, false);
};
