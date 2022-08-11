jQuery("#pie-finance").radialPieChart("init", {
  'font-size': 13,
  'fill': 18,
  'data': [
    {'color': "#E0F6FD", 'perc': 73},
    {'color': "#93D500", 'perc': 10},
    {'color': "#00A98F", 'perc': 9},
    {'color': "#00827E", 'perc': 8}
  ]
});

jQuery("#pie-insurance").radialPieChart("init", {
  'font-size': 13,
  'fill': 18,
  'data': [
    {'color': "#E0F6FD", 'perc': 75},
    {'color': "#00B3EE", 'perc': 25}
  ]
});

// var startClock = function() {
//   var dh, dm, ds;
//   setInterval(function() {
//     var date = new Date(),
//         h = date.getHours() % 12,
//         m = date.getMinutes(),
//         s = date.getSeconds();
//     if (dh !== h) { clock.radialMultiProgress("to", {
//       "index": 0, 'perc': h, 'time': (h ? 100 : 10)
//     }); dh = h; }
//     if (dm !== m) { clock.radialMultiProgress("to", {
//       "index": 1, 'perc': m, 'time': (m ? 100 : 10)
//     }); dm = m; }
//     if (ds !== s) { clock.radialMultiProgress("to", {
//       "index": 2, 'perc': s, 'time': (s ? 100 : 10)
//     }); ds = s; }
//   }, 1000);
// };

// startClock();
