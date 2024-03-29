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

var Clock10hrsWidget = {};

Clock10hrsWidget.animate = function() {
  var now = new Date();
  var hrs = Math.floor((now.getHours() / 2.4 + now.getMinutes() / 144 + now.getSeconds() / 8640 + now.getMilliseconds() / 8640000) * 10000) / 10000;

  if (Clock10hrsWidget.prev == hrs) {
    window.requestAnimationFrame(Clock10hrsWidget.animate);
    return;
  }
  Clock10hrsWidget.prev = hrs;

  var ctx = document.getElementById('clock10hrs').getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, 200, 200);
  ctx.translate(100, 100);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';

  // Hour marks
  ctx.save();
  for (var i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 5);
    ctx.moveTo(86, 0);
    ctx.lineTo(94, 0);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = 'black';

  // write Hours
  ctx.save();
  ctx.rotate((hrs + 5) * (Math.PI / 5));
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(60, 0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate(hrs * (Math.PI * 2));
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(90, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate(hrs * Math.PI * 200);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#D40000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-25, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
  window.requestAnimationFrame(Clock10hrsWidget.animate);
}

window.requestAnimationFrame(Clock10hrsWidget.animate);
