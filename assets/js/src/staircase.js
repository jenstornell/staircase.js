var staircase = (function () {
    var fn = {};
    var o = {};
    var $;

    // Init
    fn.init = function(options) {
        o = Object.assign({}, fn.defaults(), options);
        $ = fn.$;

        document.addEventListener("DOMContentLoaded", function(event) {
            document.querySelector(o.selector).dataset.scName = '/';
            fn.ajax('/');
        });
    };

    // Default options
    fn.defaults = function() {
        return {
            ajaxPath: 'ajax.php',
            selector: 'stair-case',
            fetchParams: {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        };
    };

    // $ like jQuery
    fn.$ = function(selector) {
        let all = document.querySelectorAll(selector);
        if(all.length == 0) return null;
        if(all.length == 1) return all[0];
        return all;
    }

    // Ajax
    fn.ajax = function(id) {
        let data = {};
        let params = o.fetchParams;

        data.id = id;

        let json = JSON.stringify(data);
        let current = $(o.selector + '[data-sc-name="' + id + '"], ' + o.selector + ' [data-sc-name="' + id + '"]');
        current.classList.add('sc-loading');

        params.body = json;

        fetch(o.ajaxPath, params)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            current.classList.remove('sc-loading');

            let args = {};
            args.id = id;
            args.element = current;

            if(fn.isJson(text)) {
                let array = JSON.parse(text);
                let element = fn.createList(array, id);
                let current = $(o.selector + '[data-sc-name="' + id + '"],' + o.selector + ' [data-sc-name="' + id + '"]');
                
                current.appendChild(element);
                current.dataset.scChildren = '';
                current.dataset.scState = 'open';

                fn.eventClickName(id);
                fn.eventClickFolder(current);
                fn.eventClickToggle(current);

                args.success = true;
            } else {
                args.success = false;
            }

            if(typeof o.callbacks.load === 'function') {
                o.callbacks.select(args);
            }
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
        let ul = document.createElement('ul'); 
        let data = fn.toFilesFolders(array);

        ul.dataset.scChildren = '';

        data.folders.forEach(function(item) {
            let li = fn.createLi(item);
            let id = fn.trimSlashes(parentName + '/' + item);
            
            li.dataset.scType = 'folder';
            li.dataset.scName = id;

            ul.appendChild(li);
        });

        data.files.forEach(function(item) {
            let li = fn.createLi(item);
            let id = fn.trimSlashes(parentName + '/' + item);
            
            li.dataset.scType = 'file';
            li.dataset.scName = id;

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
        let data = [];
        
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
    fn.eventClickName = function(id) {
        let selector_current = o.selector + '[data-sc-name="' + id + '"] > ul > li > .sc-current > .sc-name';
        let selector_children = o.selector + ' [data-sc-name="' + id + '"] > ul > li > .sc-current > .sc-name';
        let selector = selector_current + ', ' + selector_children;
        let elements = document.querySelectorAll(selector);

        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                let el = e.currentTarget.closest('li');
                let data = fn.setData(el);
                
                fn.removeActive();
                fn.setActive(el);

                if(typeof o.callbacks.select === 'function') {
                    o.callbacks.select(data);
                }
            });

        });
    };

    // Click toggle loaded folders
    fn.eventClickToggle = function(current) {
        let id = current.dataset.scName;
        let element = $(o.selector + '[data-sc-name="' + id + '"] > .sc-current > .sc-icon,' + o.selector + ' [data-sc-name="' + id + '"] > .sc-current > .sc-icon');

        if(element) {
            element.addEventListener('click', function(e) {
                let el = e.currentTarget.closest('li');
                let data = fn.setData(el);

                if(current.dataset.scState == 'open') {
                    current.dataset.scState = 'close';
                } else {
                    current.dataset.scState = 'open';
                }

                data.state = current.dataset.scState;

                if(typeof o.callbacks.toggle === 'function') {
                    o.callbacks.toggle(data);
                }
            });
        }
    };

    // Event click folder 
    fn.eventClickFolder = function(current) {
        let elements = current.querySelectorAll('li[data-sc-type="folder"]:not([data-sc-children]) .sc-icon');
        
        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                let el = e.currentTarget.closest('[data-sc-name]');

                if(el.dataset.scChildren === undefined) {
                    let name = el.dataset.scName;
                    id = fn.trimSlashes(name);
                    fn.ajax(id);
                }
            }, true);

        });
    };

    // Trim slashes
    fn.trimSlashes = function(str) {
        return str.replace(/^\/+|\/+$/g, '');
    };

    // Set info callback data
    fn.setData = function(el) {
        let data = {};
        data.id = el.dataset.scName;
        data.element = el;
        data.type = el.dataset.scType;

        return data;
    };


    // Remove active
    fn.removeActive = function() {
        let elements = $(o.selector + ' li');

        elements.forEach(function(element) {
            delete element.dataset.scActive;
        });
    };

    // Set active
    fn.setActive = function(element) {
        element.dataset.scActive = '';
    };

    return fn;
})();