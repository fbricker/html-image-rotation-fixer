function safeLoadImage(url, options) {
    var xhr = new XMLHttpRequest();  
    xhr.open('GET', url, true);  
    xhr.responseType = 'blob';  

    xhr.onload = function(e) {  
        var ori = 0;  
        if(options == null) options={};
        if(options.target != null || options.class != null){
            var prevOnLoad = options.onLoad;
            options.onLoad = function(img){
                if(options.target!=null) {
                        if(typeof options.target == "string") options.target = document.getElementById(options.target);
                        options.target.appendChild(img);
                }
                if(options.class!=null) img.className = options.class;
                if(prevOnLoad != null) prevOnLoad(img);
            }
        }

        if (this.status == 200) {  
            var blob = this.response;  
            loadImage.parseMetaData(blob, function(data) {  
                if (data.exif) ori = data.exif.get('Orientation');
                options.orientation=ori;
                options.canvas=true;
                var loadingImage = loadImage(url, options.onLoad, options);
            });
        }  
    };  
    xhr.send();  
}
