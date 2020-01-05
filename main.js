var svgNS = "http://www.w3.org/2000/svg";
var anim = {};

anim.translate = function(elem, dur, start, end) {
  var a = document.createElementNS(svgNS, "animateTransform");

  //var bb = elem.getBBox();
  //var cx = bb.x + bb.width / 2;
  //var cy = bb.y + bb.height / 2;

  a.setAttributeNS(null, "attributeName", "transform");
  a.setAttributeNS(null, "attributeType", "XML");
  a.setAttributeNS(null, "type", "translate");
  a.setAttributeNS(null, "dur", dur + "s");
  a.setAttributeNS(null, "repeatCount", "indefinite");
  a.setAttributeNS(null, "from", start);
  a.setAttributeNS(null, "to", end);
  a.setAttributeNS(null, "additive", "sum");

  elem.appendChild(a);
}

anim.scale = function(elem, dur, start, end)
{
  var a = document.createElementNS(svgNS, "animateTransform");

  //var bb = elem.getBBox();
  //var cx = bb.x + bb.width / 2;
  //var cy = bb.y + bb.height / 2;

  a.setAttributeNS(null, "attributeName", "transform");
  a.setAttributeNS(null, "attributeType", "XML");
  a.setAttributeNS(null, "type", "scale");
  a.setAttributeNS(null, "dur", dur + "s");
  a.setAttributeNS(null, "repeatCount", "indefinite");
  a.setAttributeNS(null, "from", start);
  a.setAttributeNS(null, "to", end);
  a.setAttributeNS(null, "additive", "sum");

  elem.appendChild(a);
  //a.beginElement();
}

anim.rotate = function(elem, dur, start, end)
{
  var a = document.createElementNS(svgNS, "animateTransform");

  var bb = elem.getBBox();
  var cx = bb.x + bb.width / 2;
  var cy = bb.y + bb.height / 2;

  a.setAttributeNS(null, "attributeName", "transform");
  a.setAttributeNS(null, "attributeType", "XML");
  a.setAttributeNS(null, "type", "rotate");
  a.setAttributeNS(null, "dur", dur + "s");
  a.setAttributeNS(null, "repeatCount", "indefinite");
  a.setAttributeNS(null, "from", start + " "+cx+" "+cy);
  a.setAttributeNS(null, "to", end +" "+cx+" "+cy);
  a.setAttributeNS(null, "additive", "sum");

  elem.appendChild(a);
  //a.beginElement();
}

var svg = document.getElementById("the-svg");
var layer = document.getElementById("layer1");
var cheek = document.getElementById("cheek");
var dick = document.getElementById("dick");
var root = document.getElementById("viewport");

//anim.scale(root, 10, 1, 5);
//anim.translate(root, 10, '0 0', '-1300 -1000');

//anim.rotate(dick, 5, 90, -270);
//anim.rotate(cheek, 5, 90, -270);
//anim.translate(layer, 5, '0 0', '-1000 -2500');
//layer.setAttribute("transform", "translate(330,300)");

// draw the dickbutts ahead of time
//setTimeout(function() {
//newDB.setAttribute("transform", );
// more than 50 causes FF to be very slow
for(var i = 0; i < 50; i++) {
    var newDB = layer.cloneNode(true);
    newDB.setAttribute("transform", "translate(460,250) scale(0.5 0.5) rotate(30)");
    newDB.setAttribute("id", "newdb" + i);
    //newDB.setAttribute("transform", "rotate(10)");
    //newDB.setAttribute("transform", "translate(30,30)");
    layer.insertBefore(newDB, dick);
    dick = newDB.childNodes[3];
    layer = newDB;
}
//}, 10);


var frame = -1;
var start = [1,0,0,1,0,0];
var restart = [7.466601490359494,0,0,7.466601490359494,-9221.989058309942,-5449.39724177728];
var end = [30164.266938375775,0,0,30164.266938375775,-42214697.3747986,-25016841.688433178];
// var end = [30164.266938375775,0,0,30164.266938375775,-42214697.3747986,-25016841.688433178];
var current = [];
var duration = 100;
var animating = false;
function renderFractal(frame) {
    var percent = frame * 1.0 / duration;
    //curve_state = curve_state * curve_state;
    // pow 3 feels like 
    var curve_state = percent;
    //-- var curve_state = 0.005 * percent + 0.995 * Math.pow(percent, 5);
    //console.log(curve_state);
    //curve_state = curve_state;
    //curve_state = Math.sqrt(curve_state);
    // `rsize * 0.5` would zoom in on the center
    /*svg.style.width = (100 + rsize) + "%";
    svg.style.left = (-rsize * 0.704) + "%";
    svg.style.height = (100 + rsize) + "%";
    svg.style.top = (-rsize * 0.77) + "%";
    */
    for (var i = 0; i < start.length; i ++) {
        current[i] = curve_state * end[i] + (1 - curve_state) * restart[i];
    }
    console.log(current);
    root.setAttribute('transform', 'matrix(' + current.join(',') + ')');
}

function render2(frame) {
  root.setAttribute("transform", "scale(2) translate(-800, -500) rotate(0)");
  root2.setAttribute("transform", "scale(4) translate(-1327, 146) rotate(-30)");
  root2.setAttribute("transform", "scale(8) translate(-1268px, 880px) rotate(-60deg)");
  root2.setAttribute("transform", "scale(16) translate(-754.5, 1440.8) rotate(-90)");
}

// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function initSvgPanZoom() {
  //matrix(30164.266938375775,0,0,30164.266938375775,-42214697.3747986,-25016841.688433178)
  //matrix(8.247773170471191,0,0,8.247773170471191,-10398.712890624998,-6050.242675781251)
  //root.setAttribute('transform', 'matrix(12122.341796875,0,0,12122.341796875,-16964395.05154133,-10053680.104685547)');
  //setTimeout(function(){root.setAttribute('transform', 'matrix(8.247773170471191,0,0,8.247773170471191,-10398.712890624998,-6050.242675781251)')}, 1000);
  
  var panZoomTiger = svgPanZoom('#svg2');
  //setTimeout(function(){root.setAttribute('transform', 'matrix(30164.266938375775,0,0,30164.266938375775,-42214697.3747986,-25016841.688433178)')}, 100);
  setTimeout(function(){root.setAttribute('transform', 'matrix(7.466601490359494,0,0,7.466601490359494,-9221.989058309942,-5449.39724177728)')}, 1000);
}
function initWheel() {
    $('body').on('mousewheel', function(event) {
        //console.log(event.deltaX, event.deltaY, event.deltaFactor);
        frame = (frame + event.deltaY * 3 + duration) % duration;
        renderFractal(frame);
        //console.log(frame);
        return false;
    });
}

function developFrames() {
  svg.setAttribute("style", "opacity:0.5");
  var svg2 = svg.cloneNode(true);
  svg2.setAttribute("id", "svg2");
  document.body.appendChild(svg2);
  window.root2 = document.querySelector("#svg2 #viewport");
}
// developFrames();

// usage:
// instead of setInterval(render, 16) ....
(function animloop() {
    // initSvgPanZoom();
    //initWheel();
    
    // requestAnimFrame(animloop);
    if(!animating) {
        return;
    }
    frame = (frame % duration) + 1;
    renderFractal(frame);
})();

setTimeout(function(){animating = true;}, 400);

// place the rAF *before* the renderFractal() to assure as close to
// 60fps with the setTimeout fallback.
