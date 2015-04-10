# snitcher
spies for errors on node processes and reports to your dev team


### WARNING:
#### Work in Progress

Next week i will refactor our internal module into here. ASAP, I will post a
production ready version and remove this warning.



## Installation

```
    npm install --save snitcher
```


## Usage

Just add snitcher at the beginning of your init js file.

```js
var snitcher = require( 'snitcher' )({
        reporter: 'GitHub',

        // reporter options
        token: 'XXXXXX',
        target: 'user/repo',
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



## Motivation

We developed snitcher as an internal mechanism to report errors into our scrum
management system (we use **GitHub**, but you can create a report for your own) and
today I deviced to refactor it into an Open-Source module, so, here it is!
