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

const speed = 0.1;
const numflakes = 500;
const snowflakes = [];

initSnow();
window.requestAnimationFrame(animateSnow);

function initSnow() {
  var canvas = document.getElementById("snow");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < numflakes; i++) {
    snowflakes[i] = {};
    snowflakes[i].i = Math.floor(Math.random() * 8) + 1;
    snowflakes[i].x = Math.floor(Math.random() * canvas.width);
    snowflakes[i].y = Math.floor(Math.random() * canvas.height);
    snowflakes[i].d = Math.floor(Math.random() * 9) + 4;
    snowflakes[i].s = snowflakes[i].d * 2 + 1;
    snowflakes[i].av = Math.random() * 0.06 - 0.03;
    snowflakes[i].ap = 0;
    snowflakes[i].hv = 0;
  }
}

function animateSnow() {
  var canvas = document.getElementById("snow");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

//  ctx.lineWidth = 2;
//  ctx.strokeStyle = 'white';
//  ctx.fillStyle = "white";

  for (let i = 0; i < numflakes; i++) {
    snowflakes[i].ap += snowflakes[i].av;
    snowflakes[i].hv += (Math.random() * snowflakes[i].s - snowflakes[i].d - 0.5 - snowflakes[i].hv) * 0.03;
    snowflakes[i].x += snowflakes[i].hv;
    snowflakes[i].y += Math.random() * snowflakes[i].d * speed;
    if (snowflakes[i].x < -snowflakes[i].d) {
      snowflakes[i].x = canvas.width + snowflakes[i].d;
    }
    if (snowflakes[i].x > canvas.width + snowflakes[i].d) {
      snowflakes[i].x = -snowflakes[i].d;
    }
    if (snowflakes[i].y > canvas.height + snowflakes[i].d) {
      snowflakes[i].i = Math.floor(Math.random() * 8) + 1;
      snowflakes[i].x = Math.floor(Math.random() * canvas.width);
      snowflakes[i].y = -snowflakes[i].d;
      snowflakes[i].d = Math.floor(Math.random() * 9) + 4;
      snowflakes[i].s = snowflakes[i].d * 2 + 1;
      snowflakes[i].av = Math.random() * 0.06 - 0.03;
      snowflakes[i].ap = 0;
      snowflakes[i].hv = 0;
    }

    var img = document.getElementById("snowflake" + snowflakes[i].i);
//    ctx.drawImage(img, snowflakes[i].x, snowflakes[i].y, snowflakes[i].s, snowflakes[i].s);

    ctx.save();
    ctx.translate(snowflakes[i].x, snowflakes[i].y);
    ctx.rotate(snowflakes[i].ap);
    ctx.drawImage(img, -snowflakes[i].d, -snowflakes[i].d, snowflakes[i].s, snowflakes[i].s);
    ctx.restore();
  }
  ctx.restore();
  window.requestAnimationFrame(animateSnow);
}
