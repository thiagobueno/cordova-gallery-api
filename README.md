# cordova-gallery-api

This plugin defines a global `galleryAPI` object, which offer methods to query gallery albums and media:

- getAlbums
- getMedia

### Method `getAlbums`

Returns an array of object `{"id" : ..., "title" : ...}`.

### Method `getMedia`

Returns an array of object with the following fields:

- id
- title
- lat
- lon
- data
- width
- height
- size
- date_create

### Installation

    cordova plugin add https://github.com/subitolabs/cordova-gallery-api.git

### Quick example

```js
document.addEventListener('deviceready', function()
{
    var $content = document.getElementById("content");

    $content.innerHTML = "Loading albums ...";

    galleryAPI.getAlbums(function(items)
    {
        var html = "";

        for(var i = 0; i < items.length; i++)
        {
            var album = items[i];

            html += '<a href="javascript:loadAlbum(\'' + album.title + '\')" class="album"><span>' + escape(album.title) + '</span></a>';
        }

        $content.innerHTML = html;

    }, function(error){console.log(error);});

    window.loadAlbum = function(albumName)
    {
        galleryAPI.getMedia(albumName, function(items)
        {
            var html = "";
            //reverse order
            //for(var i = items.length-1; i >= 0; i--)
            for(var i = 0; i < items.length; i++)
            {
                var media = items[i];

                html += '<a href="javascript:void()" class="media"><img src="' + media.data + '" /></a>';
            }

            $content.innerHTML = html;

        }, function(error){console.log(error);});
    };

}, false);
```
