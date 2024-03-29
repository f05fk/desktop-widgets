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

var ClockWidget = {};

ClockWidget.animate = function() {
  var now = new Date();
  var hrs = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

  if (ClockWidget.prev == hrs) {
    window.requestAnimationFrame(ClockWidget.animate);
    return;
  }
  ClockWidget.prev = hrs;

  var ctx = document.getElementById('clock').getContext('2d');
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
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(86, 0);
    ctx.lineTo(94, 0);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = 'black';

  // write Hours
  ctx.save();
  ctx.rotate(hrs * (Math.PI / 6));
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
  ctx.rotate(hrs * Math.PI * 120);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#D40000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-25, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
  window.requestAnimationFrame(ClockWidget.animate);
}

window.requestAnimationFrame(ClockWidget.animate);
