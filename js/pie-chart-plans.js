jQuery("#pieplans").radialPieChart("init", {
    'font-size': 13,
    'fill': 18,
    'data': getHumanValue()
});


function getHumanValue() {
    debugger;
    var dataArr = [
        { 'color': "#E0F6FD", 'perc': 72 },
        { 'color': "#FCE200", 'perc': 28 }
    ]

    return dataArr;
}

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
