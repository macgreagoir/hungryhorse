/** 
 * The Hungry Horse framework
 *
 * Copyright Mick Gregg 2013
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * 
 * The mtgg object holds config for the jQuery function, and
 * the jQuery function does all the hardwork. Content comes
 * from AJAX loads of files named in the main_menu.
 *
 * The following tags and ids are expected in the markup
 * div: main_menu, content, footer
 * canvas: logo
 *
 * The static/ directory is the hard-coded location of content,
 * and the home page is home.html.
 */

var mtgg = {
  // declare the content div loader
  loadContentDiv: function() {},

  logo_text: "Hungry Horse",
  logo_font: "70px Serif",

  // the colour stops and colours of the logo
  logo_gradient: [
    ["0.3", "#333"],
    ["0.7", "#777"],
  ],

  footer_markup: "<p>Created with Hungry Horse</p>",
};

$(document).ready(function(){
  var writeLogo = function(logo) {
    var l_canvas = document.getElementById("logo");
    var l_width = l_canvas.width;
    var l_height = l_canvas.height;
    var l_context = l_canvas.getContext("2d");
    l_context.font = mtgg.logo_font;
    var gradient = l_context.createLinearGradient(
      l_width/2, 0, 
      l_width/2, l_height
    );
    for (var i = 0; i < mtgg.logo_gradient.length; i++) {
      gradient.addColorStop(
        mtgg.logo_gradient[i][0], 
        mtgg.logo_gradient[i][1]
      );
    }
    l_context.strokeStyle = gradient;
    l_context.strokeText(logo, 10, 70);
  }(mtgg.logo_text);

  // define the function to load the content div
  // the function is declared in the mtgg object
  mtgg.loadContentDiv = function(page) {
    $("#content").load("static/" + page + ".html");
  };

  // load the menu markup, and
  // set onclick(loadContentDiv('menu item')), and
  // set underlining onhover
  $("#main_menu").load("static/main_menu.html", function() {
    $("#main_menu li").each(function() {
      $(this).attr("onclick", 
        "mtgg.loadContentDiv('" + $(this).text() + "')"
      );
    })
    .hover(
      function() { $(this).css("text-decoration", "underline"); },
      function() { $(this).css("text-decoration", "none"); }
    );
  }); 

  // load the footer and the home page
  $("#footer").html(mtgg.footer_markup);
  $("#content").load("static/home.html");
});
