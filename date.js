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

var DateWidget = {};

DateWidget.animate = function() {
  var now = new Date();
  var date = String(now.getYear() + 1900).padStart(4, '0') + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
  var time = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');
  var hrs = String(now.getHours() / 2.4 + now.getMinutes() / 144 + now.getSeconds() / 8640 + now.getMilliseconds() / 8640000).substring(0,6);

  if (DateWidget.prev == time && DateWidget.prev10hrs == hrs) {
    window.requestAnimationFrame(DateWidget.animate);
    return;
  }
  DateWidget.prev = time;
  DateWidget.prev10hrs = hrs;

  document.getElementById('date').innerHTML = date;
  document.getElementById('time').innerHTML = time;
  document.getElementById('time10hrs').innerHTML = hrs;
  window.requestAnimationFrame(DateWidget.animate);
}

window.requestAnimationFrame(DateWidget.animate);
