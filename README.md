# Exif.js

A JavaScript library for reading [EXIF meta data](https://en.wikipedia.org/wiki/Exchangeable_image_file_format) from image files.

You can use it on images in the browser, either from an image or a file input element. Both EXIF and IPTC metadata are retrieved.
This package can also be used in AMD or CommonJS environments.

**Note**: The EXIF standard applies only to `.jpg` and `.tiff` images. EXIF logic in this package is based on the EXIF standard v2.2 ([JEITA CP-3451, included in this repo](/spec/Exif2-2.pdf)).

## Install
Install `exif-js` through [NPM](https://www.npmjs.com/#getting-started):

    npm install exif-js --save    

Or [Bower](http://bower.io/):

    bower install exif-js --save

Then add a `script` tag in your an HTML in the [best position](http://stackoverflow.com/questions/436411/where-is-the-best-place-to-put-script-tags-in-html-markup) referencing your local file.

    <script src="vendors/exif-js/exif-js"></script>

**Note**: This repo has no `.min.js`. Do your own [minification](https://en.wikipedia.org/wiki/Minification_(programming)) if you want that.

If you prefer another package manager you will probably manage :D. Or you can clone this GIT repository or download it's ZIP file and extract `exif.js` to your project.

## Usage
The package adds a global `EXIF` variable (or AMD or CommonJS equivalent).

Start with calling the `EXIF.getData` function. You pass it an image as a parameter:
- either an image from a `<img src="image.jpg">`
- OR a user selected image in a `<file type="input">` element on your page.

As a second parameter you specify a callback function. In the callback function you should use `this` to access the image with the aforementioned metadata you can then use as you want.
That image now has an extra `exifdata` property which is a Javascript object with the EXIF metadata. You can access it's properties to get data like the *image caption*, the *date a photo was taken* or it's *orientation*.

You can get all tages with `EXIF.getTag`. Or get a single tag with `EXIF.getTag`, where you specify the tag as the second parameter.
The tag names to use are listed in `EXIF.Tags` in `exif.js`.

**Important**: Note that you have to wait for the image to be completely loaded, before calling `getData` or any other function. It will silently fail otherwise.
You can implement this wait, by running your exif-extracting logic on the `window.onLoad` function. Or on an image's own `onLoad` function.
For jQuery users please note that you can NOT (reliably) use jQuery's `ready` event for this. Because it fires before images are loaded.
You could use $(window).load() instead of $(document.ready() (please note that `exif-js has NO dependency on jQuery or any other external library). 
 
**JavaScript**:
```javascript
window.onload=getExif;

function getExif() {
    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function() {
        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "Model");
        var makeAndModel = document.getElementById("makeAndModel");
        makeAndModel.innerHTML = `${make} ${model}`;
    });

    var img2 = document.getElementById("img2");
    EXIF.getData(img2, function() {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
    });
}
```

**HTML**:
```html
<img src="image1.jpg" id="img1" />
<pre>Make and model: <span id="makeAndModel"></span></div>
<br/>
<img src="image2.jpg" id="img2" />
<pre id="allMetaDataSpan"></pre>
<br/>
```

Note there are also alternate tags, such the `EXIF.TiffTags`. See the source code for the full definition and use.
You can also get back a string with all the EXIF information in the image pretty printed by using `EXIF.pretty`.
Check the included [index.html](/exif-js/exif-js/blob/master/index.html).

Please refer to the [source code](exif.js) for more advanced usages such as getting image data from a [File/Blob](https://developer.mozilla.org/en/docs/Web/API/Blob) object (`EXIF.readFromBinaryFile`).

## Contributions
This is an [open source project](LICENSE.md). Please contribute by forking this repo and issueing a pull request. The project has had notable contributions already, like reading ITPC data.

You can also contribute by [filing bugs or new features please issue](/exif-js/issues).
Or improve the documentation. Please update this README when you do a pull request of proposed changes in base functionality.
