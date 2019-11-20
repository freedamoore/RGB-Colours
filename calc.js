window.onload = function(){

  var r = document.querySelector('#r'),
      g = document.querySelector('#g'),
      b = document.querySelector('#b'),
      r_val = document.querySelector('#r_val'),
      g_val = document.querySelector('#g_val'),
      b_val = document.querySelector('#b_val');

  // change the colour of a range of DOM elements when the RGB sliders are moved
  function setColor(){
    var hex1 = rgbtoHex(r.value, g.value, b.value),
        rgb1 = "rgb(" + r.value.toString() + "," + g.value.toString() + "," + b.value.toString() + ")",
        hex2 = calcMono(r.value, g.value, b.value, 30),
        hex3 = calcMono(r.value, g.value, b.value, 60);

    document.getElementById('navColor').style.backgroundColor = hex1;
    document.querySelector('h1').style.color = hex1;
    document.getElementById('color1').style.backgroundColor = hex1;
    document.getElementById('color2').style.backgroundColor = hex2;
    document.getElementById('color3').style.backgroundColor = hex3;
    document.getElementById('highlighted').style.backgroundColor = hex3;
    document.getElementById('btnChange').style.backgroundColor = hex2;
    document.getElementById('hex1').innerHTML = hex1;
    document.getElementById('hex2').innerHTML = hex2;
    document.getElementById('hex3').innerHTML = hex3;
    document.getElementById('rgb1').innerHTML = rgb1;
    document.getElementById('rgb2').innerHTML = hextoRGB(hex2);
    document.getElementById('rgb3').innerHTML = hextoRGB(hex3);
  }

  function rgbtoHex(rv,gv,bv){
    var r_hex = parseInt(rv).toString(16),
        g_hex = parseInt(gv).toString(16),
        b_hex = parseInt(bv).toString(16),
        hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
        return hex;
  }

  function hextoRGB(hexv){
    var rv = parseInt(hexv.substring(1,3),16).toString(),
        gv = parseInt(hexv.substring(3,5),16).toString(),
        bv = parseInt(hexv.substring(5,7),16).toString(),
        rgb_val = "rgb("+ rv + "," + gv + "," + bv + ")";
    return rgb_val;
  }

  // Calculate a Monochromaticvalue based on the current RGB values and the given x value. x will dictate the lightness.
  // If the value of x will take the value of red, green or blue over 255 just sets it to 255 instead.
  function calcMono(rv, gv, bv, x){

     var r_val = (parseInt(rv) + x),
         g_val = (parseInt(gv) + x),
         b_val = (parseInt(bv) + x);

    r_val = (r_val > r_val % 255)? 255 : r_val;
    g_val = (g_val > g_val % 255)? 255 : g_val;
    b_val = (b_val > b_val % 255)? 255 : b_val;

    var hex = "#" + pad(r_val.toString(16)) + pad(g_val.toString(16)) + pad(b_val.toString(16));
    return hex;
  }

  // This function is a work in progress. Will try to calculate a complementary colour based on the RGB colour model.
  // Needs fine tuning and not used yet
  function calcCompl(rv, gv, bv){
    var r_val = Math.abs(255 - parseInt(rv)),
        g_val = Math.abs(255 - parseInt(gv)),
        b_val = Math.abs(255 - parseInt(bv));

   var hex = "#" + pad(r_val.toString(16)) + pad(g_val.toString(16)) + pad(b_val.toString(16));
   return hex;
  }

 //pad the hex values coresponding to R, G and B with zero so that they are always 2 digits long.
  function pad(x){
    if (x.length < 2) {
      x = "0" + x;
    }
    return x;
  }

// The event listeners for the sliders

  r.addEventListener('input', function() {
    setColor();
    r_val.value = r.value;
  }, false);

  g.addEventListener('input', function() {
    setColor();
    g_val.value = g.value;
  }, false);

  b.addEventListener('input', function() {
    setColor();
    b_val.value = b.value;
  }, false);

//event listener to change the text of the info div when the button is pressed.
  document.getElementById('btnChange').addEventListener('click', function() {
    document.getElementById('info').innerHTML = "Move the sliders to change the color of elements on the page";
  }, false);
}
