
## Hydrogen

An Eulerian path game used with CouchDB and Node.js.

## Screenshot & Tips

![Screenshot & Tips](https://raw.github.com/snowmantw/Hydrogen/master/document/introduction/Help.png)


## How to Use

[Demo site at Heroku](http://sharp-ice-3244.herokuapp.com/)

## Installation

Require CouchDB and Node.js.

Ubuntu:

    sudo apt-get install couchdb nodejs

After CouchDB installed, open your browser and go to the web interface of CouchDB:

    http://<address of couchdb>:5984/_utils/

Then you should create the administrator, and create a database named "hydrogen" ( it's a bug I didn't fix ).

Remember that you may need modify URL or port of the database in the `server.js`: 

    DBURL = "<address of URL>"
    // ...

Change into the directory and run the server:

    npm install && node ./server.js

## License

Project Hydrogen: an Eulerian path game (C) 2012 Greg Weng, snowmantw@gmail.com

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
