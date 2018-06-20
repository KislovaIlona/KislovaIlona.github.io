$(document).ready(function() {

//------------------------color cup------------------------------
	var images = [
		'img/pic_01.jpg',
		'img/pic_02.jpg',
		'img/pic_03.jpg',
		'img/pic_04.jpg',
		'img/pic_05.jpg',
		'img/pic_06.jpg',
		'img/pic_07.jpg',
		'img/pic_08.jpg',
		'img/pic_09.jpg',
		'img/pic_10.jpg',
	];
	var active_image = 0;
	$(function() {
		var picture = new Image();
		picture.onload = function() {
			ctx.drawImage(picture, 0, 0, 850, 650);
		}
		picture.src = images[active_image];

		var canvas = document.getElementById('viewport');
		var ctx = canvas.getContext('2d');

		$('#viewport').mousemove(function(e) {
			var canvas_offset = $(canvas).offset();
			var canvas_x = Math.floor(e.pageX - canvas_offset.left);
			var canvas_y = Math.floor(e.pageY - canvas_offset.top);
			var imageData = ctx.getImageData(canvas_x, canvas_y, 1, 1);
			var pixel = imageData.data;
			var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
			$("#preview").css('backgroundColor', pixelColor);
		});

		$('#viewport').click(function(e) {
			var canvas_offset = $(canvas).offset();
			var canvas_x = Math.floor(e.pageX - canvas_offset.left);
			var canvas_y = Math.floor(e.pageY - canvas_offset.top);
			var imageData = ctx.getImageData(canvas_x, canvas_y, 1, 1);
			var pixel = imageData.data;
			$("#rVal").val(pixel[0]);
			$("#gVal").val(pixel[1]);
			$("#bVal").val(pixel[2]);
			$("#rgbVal").val(pixel[0]+', '+pixel[1]+', '+pixel[2]);
			$("#rgbaVal").val(pixel[0]+', '+pixel[1]+', '+pixel[2]+', '+pixel[3]);
			var hex_color = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
			$("#hexVal").val( '#' + hex_color.toString(16));
		});

		$("#nextImage").click(function(e) {
			active_image++;
			if(active_image >= 10) {
				active_image = 0;
			}
			picture.src = images[active_image];
		});

	});

//---------------------------color picker-------------------------------------

 $pallet = $('<canvas width="400" height="300"></canvas>');
   $pallet.css({
    'position': 'absolute',
    'top': '120px',
    'left': '80px',
    'cursor': 'crosshair',
    'display': 'block'
   });
   $('div.column-second').append($pallet);
   var ctx = $pallet[0].getContext('2d');
   render();
   $pallet.click(function(e) {
    var pixel_color = getColor(e);
    $('div.prev-win').css('backgroundColor', pixel_color);
    monoPallet(pixel_color);
    contrastPallet(pixel_color);
    triadPallet(pixel_color);
    tetradPallet(pixel_color);
    analogyPallet(pixel_color);
    monochromatic(pixel_color);
    activeBut();
   })

   function render() {
        var gradient = ctx.createLinearGradient(0, 0, $pallet.width(), 0);

        // Create color gradient
        gradient.addColorStop(0,    "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1,    "rgb(255,   0,   0)");

        // Apply gradient to canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Create semi transparent gradient (white -> trans. -> black)
        gradient = ctx.createLinearGradient(0, 0, 0, $pallet.height());
        gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

        // Apply gradient to canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function getColor(e) {
        var pos_x = e.pageX - $pallet.offset().left;
        var pos_y = e.pageY - $pallet.offset().top;

        data = ctx.getImageData(pos_x, pos_y, 1, 1).data;
        var hex_color = '#' + toHex(data[0]) + toHex(data[1]) + toHex(data[2]);
        $(function() {
          $('#valR').text(data[0]);
          $('#valG').text(data[1]);
          $('#valB').text(data[2]);
          $('#valRGB').text(data[0]+','+data[1]+','+data[2]);
          $('#valRGBA').text(data[0]+','+data[1]+','+data[2]+','+data[3]);
          $('#valHEX').text(hex_color);
        })

        //return '#' + toHex(data[0]) + toHex(data[1]) + toHex(data[2]);
        return hex_color;
    };

    function toHex(dec) {
        hex = dec.toString(16);
        return hex.length == 2 ? hex : '0' + hex;
    };

    function activeBut() {
      $('.mono-but').prop('disabled',false).addClass('active-but');
      $('.contrast-but').prop('disabled',false).addClass('active-but');
      $('.triad-but').prop('disabled',false).addClass('active-but');
      $('.tetrad-but').prop('disabled',false).addClass('active-but');
      $('.analogy-but').prop('disabled',false).addClass('active-but');
      $('.monochrom-but').prop('disabled',false).addClass('active-but');
    }

    function monoPallet(hex) {
      var light_1 = $.xcolor.lighten(hex, 1, 32);
      var light_2 = $.xcolor.lighten(hex, 2, 44);
      var darken = $.xcolor.darken(hex, 2, 32);
      $('#m-pallet-1').css('backgroundColor', hex);
      $('#m-pallet-2').css('backgroundColor', light_1);
      $('#m-pallet-3').css('backgroundColor', light_2);
      $('#m-pallet-4').css('backgroundColor', darken);
    }

    function contrastPallet(hex) {
      var light_1 = $.xcolor.lighten(hex, 1, 32);
      var light_2 = $.xcolor.lighten(hex, 2, 44);
      var contr = $.xcolor.complementary(hex);
      $('#c-pallet-1').css('backgroundColor', hex);
      $('#c-pallet-2').css('backgroundColor', light_1);
      $('#c-pallet-3').css('backgroundColor', light_2);
      $('#c-pallet-4').css('backgroundColor', contr);
    }

    function triadPallet(hex) {
      var tri = $.xcolor.triad(hex);
      var darken = $.xcolor.darken(hex, 2, 32);
      $('#tri-pallet-1').css('backgroundColor', tri[0].toString());
      $('#tri-pallet-2').css('backgroundColor', tri[1].toString());
      $('#tri-pallet-3').css('backgroundColor', tri[2].toString());
      $('#tri-pallet-4').css('backgroundColor', darken);
    }

    function tetradPallet(hex) {
      var tet = $.xcolor.tetrad(hex);
      $('#tet-pallet-1').css('backgroundColor', tet[0].toString());
      $('#tet-pallet-2').css('backgroundColor', tet[1].toString());
      $('#tet-pallet-3').css('backgroundColor', tet[2].toString());
      $('#tet-pallet-4').css('backgroundColor', tet[3].toString());
    }

    function analogyPallet(hex) {
      var an = $.xcolor.analogous(hex, 6, 7);
      $('#an-pallet-1').css('backgroundColor', an[0].toString());
      $('#an-pallet-2').css('backgroundColor', an[1].toString());
      $('#an-pallet-3').css('backgroundColor', an[2].toString());
      $('#an-pallet-4').css('backgroundColor', an[3].toString());
      $('#an-pallet-5').css('backgroundColor', an[4].toString());
      $('#an-pallet-6').css('backgroundColor', an[5].toString());
    }

    function monochromatic(hex) {
      var monochrom = $.xcolor.monochromatic(hex, 6);
      $('#chrom-pallet-1').css('backgroundColor', monochrom[0].toString());
      $('#chrom-pallet-2').css('backgroundColor', monochrom[1].toString());
      $('#chrom-pallet-3').css('backgroundColor', monochrom[2].toString());
      $('#chrom-pallet-4').css('backgroundColor', monochrom[3].toString());
      $('#chrom-pallet-5').css('backgroundColor', monochrom[4].toString());
      $('#chrom-pallet-6').css('backgroundColor', monochrom[5].toString());
    }

//----------------------------toooltip------------------------------------------
  $td = $('td');


  $td.each(function(index, element) {
    $(element).hover(function() {
      var text_rgb = $(this).css('backgroundColor');
      var text_hex = getHexRGBColor(text_rgb);
      $(this).find('.tooltip').text(text_hex).fadeIn('fast');
    },
    function() {
       $(this).find('.tooltip').text('').fadeOut('fast');
    });
  });

  function getHexRGBColor(color) {
    color = color.replace(/\s/g,"");
    var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

    if(aRGB){
      color = '';
      for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
    } else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
    
    return '#' + color;
  }

 //------------------------------save color scheme--------------------------------------
 var arrColorScheme = [];
 var monoBut = $('.mono-but');
 var contrastBut = $('.contrast-but');
 var triadBut = $('.triad-but');
 var tetradBut = $('.tetrad-but');
 var analogyBut = $('.analogy-but');
 var monochromBut = $('.monochrom-but');

 monoBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.mono td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });

 contrastBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.contrast td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });

 triadBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.triad td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });

 tetradBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.tetrad td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });

 analogyBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.analogy td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });

  monochromBut.click({z:arrColorScheme}, function(eventObject) {
  var a = $('.monochromatic td');
  var b = eventObject.data.z;
  createArr(a,b);
  return b;
 });


 function createArr(a,b) {
  var col_arr = a.map(function(index, element) {
    var ccc = $(element).css('backgroundColor');
    return ccc;
  });
  var ttt = col_arr.get();
  b.push(ttt);
  console.log(b);
  return b;
 };


//----------------------color-scheme--------------------------
var show_color = $('button.show-color-schemes');
var block_color = $('div.block-color-schemes').get(0);
var lighter_but = document.querySelectorAll('.lighter-but');
var darker_but = document.querySelectorAll('.darker-but');
var scheme = $('section.scheme');
var colorCup = $('section.color-cup');
var colorPicker = $('section.color-picker');


show_color.click({r:arrColorScheme, b:block_color, p:scheme}, function(eventObject){
  var t = eventObject.data.r;
  var z = eventObject.data.b;
  var p = eventObject.data.p;

  z.innerHTML = '';
  
  if(t.length > 0) {
    var na = uniqBy(t);
    createColorScheme(na, z);
    p.css('display', 'block');
  } else {
    alert('Добавьте цветные схемы!');
  }
  console.log(na);
});



function uniqBy(a) {
    var seen = {};
    return a.filter(function(item) {
        var k = JSON.stringify(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
};

function lighterColor() {
  var pc = this.parentElement;
  var style = getComputedStyle(pc);
  var nu = pc.dataset.cell;
  var u = style.backgroundColor;
  var ss = '\"' + u + '\"';
  var nc = $.xcolor.lighten(ss, 1, 10).getHex();
  pc.style.backgroundColor = nc;

  var trtr = pc.parentElement.nextElementSibling;
  trtr.children[nu].innerHTML = nc;

  console.log(trtr);
  console.log(nc);
}

function darkenColor() {
  var pc = this.parentElement;
  var style = getComputedStyle(pc);
  var nu = pc.dataset.cell;
  var u = style.backgroundColor;
  var ss = '\"' + u + '\"';
  var nc = $.xcolor.darken(ss, 1, 10).getHex();
  pc.style.backgroundColor = nc;

  var trtr = pc.parentElement.nextElementSibling;
  trtr.children[nu].innerHTML = nc;

  console.log(trtr);
  console.log(nc);
}


function createColorScheme(t, block_color) {
  for(var i = 0; i < t.length; i++) {
    var block_table = document.createElement('div');
    var table = document.createElement('table');
    table.classList.add('view-table');
    var tr_1 = document.createElement('tr');
    var tr_2 = document.createElement('tr');
    for(var j = 0; j < t[i].length; j++) {
      var ht = getHexRGBColor(t[i][j]);
      var bac = '\"' + ht + '\"';
      console.log(bac);
      var td_1 = document.createElement('td');
      td_1.classList.add('color-cell');
      td_1.setAttribute('data-cell', j);
      var td_2= document.createElement('td');
      td_2.classList.add('text-cell');
      td_2.setAttribute('data-cell', j);
      var b_l = document.createElement('button');
      var b_b = document.createElement('button');
      b_l.classList.add('lighter-but');
      b_l.addEventListener('click', lighterColor);
      b_l.innerHTML = '';
      b_b.innerHTML = '';
      b_b.classList.add('darker-but');
      b_b.addEventListener('click', darkenColor);
      td_2.innerHTML = ht;
      td_1.style.backgroundColor = ht;
      td_1.appendChild(b_l);
      td_1.appendChild(b_b);
      tr_1.appendChild(td_1);
      tr_2.appendChild(td_2);
    };
    block_color.appendChild(block_table);
    block_table.appendChild(table);
    table.appendChild(tr_1);
    table.appendChild(tr_2);
  };
};

//------------------------------------------------------
























});