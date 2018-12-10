var staircase = (function () {
    var fn = {};
    var o = {};

    fn.init = function(options) {
        o = Object.assign({}, fn.defaults(), options);

        console.log(o);

        document.addEventListener("DOMContentLoaded", function(event) {
            document.querySelector('stair-case').dataset.staircaseId = '/';
            fn.ajax('/');
            //fn.events();
        });
    };

    // Default options
    fn.defaults = function() {
        return {
            ajaxPath: 'ajax.php',
            selector: 'stair-case'
        };
    };

    fn.ajax = function(id) {
        data = {};
        data.id = id;

        var json = JSON.stringify(data);

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
            var array = JSON.parse(text);
            var element = fn.createList(array);

           document.querySelector('[data-staircase-id]').appendChild(element);

           fn.eventClickInfo();
        });
    };

    fn.createList = function(array) {
        var ul = document.createElement('ul'); 

        array.forEach(function(item) {
            console.log(fn.isFolder(item));
            var li = document.createElement('li');
            var textnode = document.createTextNode(item);
            li.appendChild(textnode);


            if(fn.isFolder(item)) {
                li.dataset.staircaseId = item.slice(0, -1);
            }

            ul.appendChild(li);
        });

        return ul;
    };

    fn.isFolder = function(item) {
        return (item[item.length - 1] == '/') ? true: false;
    };

    fn.eventClickInfo = function() {
        var elements = document.querySelectorAll('stair-case li');
        elements.forEach(function(element) {
            console.log(element);
            element.addEventListener('click', function(e) {
                fn.removeActive();
                fn.setActive(e.target);

                var data = {};
                data.element = e.target;
                data.id = e.target.dataset.staircaseId;

                o.callback(e.target);
                // type
                // path
            });

        });
    };


    // Remove active
    fn.removeActive = function() {
        var elements = document.querySelectorAll('stair-case li');
        elements.forEach(function(element) {
            delete element.dataset.staircaseActive;
        });
    };

    fn.setActive = function(element) {
        element.dataset.staircaseActive = '';
    };

    return fn;
})();