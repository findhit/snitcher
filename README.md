# snitcher

[![Test Status](http://strider.findhit.com/findhit/snitcher/badge)](http://strider.findhit.com/findhit/snitcher) [![Dependency Status](https://david-dm.org/findhit/snitcher.svg)](https://david-dm.org/findhit/snitcher)


spies for errors on node processes and reports to your dev team


![screenshot](https://cloud.githubusercontent.com/assets/3604053/7375043/d278127e-edcd-11e4-8344-12c405e04bd1.png)


## Installation

```
    npm install --save snitcher
```


## Usage

Just add snitcher at the beginning of your init js file.

```js
var Snitcher = require( 'snitcher' ),
    snitcher = new Snitcher({
        // Snitcher options
        reporter: new Snitcher.Reporter.Github({
            // GitHub Reporter options
            user: 'username',
            repo: 'repository',
            token: '.XXX', // non-porn videos
        })
    });

// At this point, snitcher should already be watching for uncaught errors and
// sending them into target repo issues.

setImmediate(function () {
    throw new Error ( "hello team!!!" );
});

//
// Your app bootstrap goes here
//

```

You could set snitcher to snitch errors from **objects** with **EventEmitter**
capabilities, such as streams:

```js
var stream; // your awesome stream;

// catch errors from stream
snitcher.catch( stream );
```

Looking for a middleware to **connect**, **express** or **emvici**?

```js
var app; // your awesome app;


app.use(function ( req, res, next ) {
    throw new Error( "holly f*ck, an error!!!!1" );
});

// well, at least you will know it
app.use( snitcher.middleware() );
```



## Customizable

At our first release you should be able to set templates for each kind of report.



## Testing

```bash
npm test
```

If you wish to test reporters such as GitHub, you should expose their configs
trought ENV variables before running `npm test`.

Example for **GitHub Reporter**:

```bash
export SNITCHER_GITHUB_USER=cusspvz
export SNITCHER_GITHUB_REPO=snitcher-reporter-api-test
export SNITCHER_GITHUB_TOKEN=0123456789abcdef1234567890abcdef12345678
npm test
```



## Motivation

We developed snitcher as an internal mechanism to report errors into our scrum
management system. We use **GitHub** :+1:, but if it isn't your case, you could
create a reporter for your own and PR it! :)

10/Apr/2015 I've decided to give **snitcher** a chance to co-exist into the
Open-Source world, so here it is!
