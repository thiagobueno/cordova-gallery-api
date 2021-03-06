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
    
    /*
    //Example started by an album
    var albumName = "Camera Roll";
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
    */

    function escape(v)
    {
        return v.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
            return '&#'+i.charCodeAt(0)+';';
        });
    }


}, false);
