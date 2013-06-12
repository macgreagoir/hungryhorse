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
 * from AJAX loads of files named in the menu.
 *
 * The following tags and ids are expected in the markup
 * div: words, pic, footer
 * canvas: logo
 * ul: menu
 *
 * The static/ directory is the hard-coded location of content,
 * and the home page is home.html.
 */

// TODO maybe this object's content could all be put inside the closure
// and loadContent could be returned from it
var mtgg = {
  // declare the content div loader
  loadContent: function() {},

  // args for writeLogo
  logo: {
    text: "Hungry Horse",
    font: "70px Serif",

    // the colour stops and colours of the logo
    gradient: [
      ["0.3", "#333"],
      ["0.7", "#777"],
    ]
  },

  // text to show in menu, words and pic to load from menu item
  // target is either static (static/words.html) or 
  // md for the Markdown CGI script (cgi-bin/mtgg_md.pl?words=words)
  // TODO other targets could be added too, for example JSON
  // TODO we could assume some defaults to make the menu properties smaller
  // like static target and words based on text
  menu: [
    {
      text: "Home",
      target: "static",
      words: "home",
    },
    {
      text: "About",
      target: "static",
      words: "about",
      pic: "about",
    },
    {
      text: "Contact",
      target: "contact",
    },
  ],

  footer_markup: "<p>Created with Hungry Horse</p>",
};

$(document).ready(function(){
  var writeLogo = function(logo) {
    var l_canvas = document.getElementById("logo");
    var l_width = l_canvas.width;
    var l_height = l_canvas.height;
    var l_context = l_canvas.getContext("2d");
    l_context.font = logo.font;
    var gradient = l_context.createLinearGradient(
      l_width/2, 0, 
      l_width/2, l_height
    );
    for (var i = 0; i < logo.gradient.length; i++) {
      gradient.addColorStop(
        logo.gradient[i][0], 
        logo.gradient[i][1]
      );
    }
    l_context.strokeStyle = gradient;
    l_context.strokeText(logo.text, 10, 70);
  }(mtgg.logo);

  // define the function to load the content div
  // the function is declared in the mtgg object
  mtgg.loadContent = function(target, words, pic) {
    var src = "";
    if (target === "contact") {
      src = "cgi-bin/contact.pl";
    } else if (target !== undefined && words !== undefined) {
      switch(target) {
        case "static":
          src = "static/" + words + ".html";
          break;

        case "md":
          src = "cgi-bin/mtgg_md.pl?words=" + words;
          break;
      }
    }
    if (src !== "") {
      // go get it!
      $("#words").load(src);
    } else {
      // empty the div
      $("#words").html(src);
    }

    var pic_html = "";
    if (pic !== undefined) { 
      pic_html = "<img src='images/" + pic + ".png'>";
    }
    $("#pic").html(pic_html);
  };

  // write the menu markup
  // TODO we should just pass an id to loadContent and deal with the menu
  // properties directly inside the function
  for (var i = 0; i < mtgg.menu.length; i++) {
    var item = mtgg.menu[i];
    var args = "";

    // build a string of args string for the onclick function
    if (item.target !== undefined) {
      args += "'" + item.target + "'";
    } else {
      args += "undefined";
    }

    if (item.words !== undefined) {
      args += ", '" + item.words + "'";
    } else {
      // stick in a placeholder in case we have a pic
      args += ", undefined";
    }

    if (item.pic !== undefined) {
      args += ", '" + item.pic + "'";
    }

    var li = "<li ";
    li += "onclick=\"mtgg.loadContent(" + args + ")\">";
    li += item.text;
    li += "</li>";
    $("#menu").append(li);
  }

  // give the menu some style
  $("#menu li").hover(
    function() { $(this).css("text-decoration", "underline"); },
    function() { $(this).css("text-decoration", "none"); }
  );

  // load the footer and the home page
  $("#footer").html(mtgg.footer_markup);
  mtgg.loadContent('static', 'home');
});
