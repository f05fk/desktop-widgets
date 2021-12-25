/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
 * Copyright (C) Claus Schrammel <claus@f05fk.net>                       *
 *                                                                       *
 * This program is free software: you can redistribute it and/or modify  *
 * it under the terms of the GNU General Public License as published by  *
 * the Free Software Foundation, either version 3 of the License, or     *
 * (at your option) any later version.                                   *
 *                                                                       *
 * This program is distributed in the hope that it will be useful,       *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 * GNU General Public License for more details.                          *
 *                                                                       *
 * You should have received a copy of the GNU General Public License     *
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. *
 *                                                                       *
 * SPDX-License-Identifier: GPL-3.0-or-later                             *
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var SnowAnimation = {};

SnowAnimation.initSnowflakes = function() {
  var canvas = document.getElementById("snow");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  SnowAnimation.snowflakes = [];
  for (let i = 0; i < 500; i++) {
    SnowAnimation.snowflakes[i] = {};
    SnowAnimation.resetSnowflake(SnowAnimation.snowflakes[i], canvas, true);
  }
}

SnowAnimation.resetSnowflake = function(snowflake, canvas, init) {
  snowflake.i = Math.floor(Math.random() * 8) + 1;
  snowflake.d = Math.floor(Math.random() * 9) + 4;
  snowflake.s = snowflake.d * 2 + 1;
  snowflake.x = Math.floor(Math.random() * canvas.width);
  snowflake.y = init ? Math.floor(Math.random() * canvas.height) : -snowflake.d;
  snowflake.av = Math.random() * 0.06 - 0.03;
  snowflake.ap = 0;
  snowflake.hv = 0;
}

SnowAnimation.animateSnow = function() {
  var canvas = document.getElementById("snow");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < SnowAnimation.snowflakes.length; i++) {
    SnowAnimation.snowflakes[i].ap += SnowAnimation.snowflakes[i].av;
    SnowAnimation.snowflakes[i].hv += (Math.random() * SnowAnimation.snowflakes[i].s - SnowAnimation.snowflakes[i].d - 0.5 - SnowAnimation.snowflakes[i].hv) * 0.03;
    SnowAnimation.snowflakes[i].x += SnowAnimation.snowflakes[i].hv;
    SnowAnimation.snowflakes[i].y += Math.random() * SnowAnimation.snowflakes[i].d * 0.1;
    if (SnowAnimation.snowflakes[i].x < -SnowAnimation.snowflakes[i].d) {
      SnowAnimation.snowflakes[i].x = canvas.width + SnowAnimation.snowflakes[i].d;
    }
    if (SnowAnimation.snowflakes[i].x > canvas.width + SnowAnimation.snowflakes[i].d) {
      SnowAnimation.snowflakes[i].x = -SnowAnimation.snowflakes[i].d;
    }
    if (SnowAnimation.snowflakes[i].y > canvas.height + SnowAnimation.snowflakes[i].d) {
      SnowAnimation.resetSnowflake(SnowAnimation.snowflakes[i], canvas, false);
    }

    var img = document.getElementById("snowflake" + SnowAnimation.snowflakes[i].i);

    ctx.save();
    ctx.translate(SnowAnimation.snowflakes[i].x, SnowAnimation.snowflakes[i].y);
    ctx.rotate(SnowAnimation.snowflakes[i].ap);
    ctx.drawImage(img, -SnowAnimation.snowflakes[i].d, -SnowAnimation.snowflakes[i].d, SnowAnimation.snowflakes[i].s, SnowAnimation.snowflakes[i].s);
    ctx.restore();
  }
  ctx.restore();
  window.requestAnimationFrame(SnowAnimation.animateSnow);
}

SnowAnimation.initSnowflakes();
window.requestAnimationFrame(SnowAnimation.animateSnow);
