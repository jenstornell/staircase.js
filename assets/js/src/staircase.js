var staircase = (function () {
    var fn = {};
    var o = {};

    // Init
    fn.init = function(options) {
        o = Object.assign({}, fn.defaults(), options);

        document.addEventListener("DOMContentLoaded", function(event) {
            document.querySelector('stair-case').dataset.scName = '/';
            fn.ajax('/');
        });
    };

    // Default options
    fn.defaults = function() {
        return {
            ajaxPath: 'ajax.php',
            selector: 'stair-case',
            prefix: 'sc'
        };
    };

    // Ajax
    fn.ajax = function(id) {
        var data = {};
        data.id = id;

        var json = JSON.stringify(data);
        let current = document.querySelector('[data-sc-name="' + id + '"]');
        current.classList.add('sc-loading');

        fetch(o.ajaxPath, {
            method: 'POST',
            body: json,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            current.classList.remove('sc-loading');

            let args = {};
            args.id = id;
            args.element = current;

            if(fn.isJson(text)) {
                var array = JSON.parse(text);
                var element = fn.createList(array, id);
                let current = document.querySelector('[data-sc-name="' + id + '"]');
                
                current.appendChild(element);
                current.dataset.children = '';
                current.dataset.scState = 'open';

                fn.eventClickName();
                fn.eventClickFolder(current);
                fn.eventClickToggle(current);

                args.success = true;
            } else {
                args.success = false;
            }
            o.callbackAfterLoad(args);
        });
    };
    
    fn.isJson = function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // Create list
    fn.createList = function(array, parentName) {
        var ul = document.createElement('ul'); 
        ul.classList.add('sc-children');

        let data = fn.toFilesFolders(array);

        data.folders.forEach(function(item) {
            let li = fn.createLi(item);
            let id = fn.trimSlashes(parentName + '/' + item);
            
            li.dataset.scType = 'folder';
            li.dataset.scName = id;

            ul.appendChild(li);
        });

        data.files.forEach(function(item) {
            let li = fn.createLi(item);
            
            li.dataset.scType = 'file';
            li.dataset.scName = item;

            ul.appendChild(li);
        });

        return ul;
    };

    fn.createLi = function(item) {
        let li = document.createElement('li');
        let current = document.createElement('div');
        let icon = document.createElement('div');
        let name = document.createElement('div');
        let textnode = document.createTextNode(item);

        icon.classList.add('sc-icon');
        name.classList.add('sc-name');
        current.classList.add('sc-current');

        name.appendChild(textnode);

        current.appendChild(icon);
        current.appendChild(name);

        li.appendChild(current);

        return li;
    };

    // To files and folders
    fn.toFilesFolders = function(array) {
        var data = [];
        
        data.folders = [];
        data.files = [];

        let i = 0;
        
        array.forEach(function(item) {
            if(fn.isFolder(item)) {
                data.folders[i] = item.slice(0, -1);
            } else {
                data.files[i] = item
            }
            i++;
        });

        data.folders.sort();
        data.files.sort();

        return data;
    };

    // Is folder
    fn.isFolder = function(item) {
        return (item[item.length - 1] == '/') ? true: false;
    };

    // Event click name
    fn.eventClickName = function() {
        var elements = document.querySelectorAll('stair-case li .sc-name');
        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                let el = e.currentTarget.closest('li');
                let data = fn.setData(el);
                
                fn.removeActive();
                fn.setActive(el);
                o.callbackActive(data);
            });

        });
    };

    fn.eventClickToggle = function(current) {
        let el = current.querySelector(':scope > .sc-current > .sc-icon');
        if(el) {
            el.addEventListener('click', function(e) {
                console.log('jens');
                if(current.dataset.scState == 'open') {
                    current.dataset.scState = 'close';
                } else {
                    current.dataset.scState = 'open';
                }
            });
        }
    };

    // Event click folder 
    fn.eventClickFolder = function(current) {
        var elements = current.querySelectorAll('li[data-sc-type="folder"]:not([data-children]) .sc-icon');
        
        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                var el = e.currentTarget.closest('[data-sc-name]');

                if(el.dataset.children === undefined) {
                    let name = el.dataset.scName;
                    id = fn.trimSlashes(name);
                    //el.dataset.scState = 'open';
                    fn.ajax(id);
                }
            }, true);

        });
    };

    fn.trimSlashes = function(str) {
        str = str.replace(/^\/|\/$/g, '');
        return str.replace(/^\/|\/$/g, '');
    };

    // Set info callback data
    fn.setData = function(el) {
        var data = {};
        data.element = el;
        data.name = el.dataset.scName;
        data.type = el.dataset.scType;

        return data;
    };


    // Remove active
    fn.removeActive = function() {
        var elements = document.querySelectorAll('stair-case li');
        elements.forEach(function(element) {
            delete element.classList.remove('sc-active');
        });
    };

    // Set active
    fn.setActive = function(element) {
        element.classList.add('sc-active');
    };

    return fn;
})();