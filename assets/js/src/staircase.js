class StaircaseCore {
  options() {
    let selector = this.$('body').dataset.staircaseSelector;
    let options = this.$(selector).dataset;

    this.o = {};
    this.o.selector = selector;
    
    for(let attr in options) {
      this.o[attr.substr(9).toLowerCase()] = options[attr];
    }
  }

  load() {
    this.options();
    this.$(this.o.selector).dataset.scName = '/';
    this.ajax('/');
  }

  $(selector, base = null) {
    if(base) {
      return base.querySelector(selector);
    } else {
      return document.querySelector(selector);
    }
  }

  $$(selector, base = null) {
    if(base) {
      return base.querySelectorAll(selector);
    } else {
      return document.querySelectorAll(selector);
    }
  }

  // Ajax
  ajax(id) {
    let rest = id;
    let data = {};

    if(typeof id == 'object') {
      id = rest.shift();
      data.id = id;
    } else if(typeof id == 'string') {
      data.id = id;
    }

    let json = JSON.stringify(data);
    let current = this.$(this.o.selector + '[data-sc-name="' + id + '"], ' + this.o.selector + ' [data-sc-name="' + id + '"]');

    if(current.dataset.scChildren !== undefined) {
      current.dataset.scState = 'open';
      if(!rest.length) return;
      this.ajax(rest);
      return;
    }

    current.classList.add('sc-loading');

    fetch(this.o.path, this.fetchParams(json))
    .then((response) => { return response.text(); })
    .then((text) => {
      current.classList.remove('sc-loading');

      let args = {};
      args.id = id;
      args.element = current;

      if(this.isJson(text)) {
        let array = JSON.parse(text);
        let element = this.createList(array, id);
        let current = this.$(this.o.selector + '[data-sc-name="' + id + '"],' + this.o.selector + ' [data-sc-name="' + id + '"]');
        
        current.appendChild(element);
        current.dataset.scChildren = '';
        current.dataset.scState = 'open';

        this.ajaxClickName(id);
        this.ajaxClickFolder(current);
        this.ajaxClickToggle(current);

        args.success = true;
      } else {
        args.success = false;
      }
      if(args.id == '/') {
        this.callback('load', args);
      } else {
        this.callback('toggle', args);
      }

      if(args.success) {
        if(rest && rest.length && typeof rest == 'object') {
          let next = this.$(this.o.selector + ' [data-sc-name="' + rest[0] + '"]');
          if(next.dataset.scChildren === undefined) {
            this.ajax(rest);
          }
        }
      }
    });
  };

  fetchParams(json) {
    return {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: json
    };
  }

  callback(name, args = {}) {
    if(typeof StaircaseCallbacks === 'function') {
      let callbacks = new StaircaseCallbacks();
      if(typeof callbacks[name] === 'function') {
        callbacks[name](args);
      }
    }
  }

  add(base, name, type) {
    this.options();
    let ul = this.$('[data-sc-name="' + base + '"] > [data-sc-children]');
    let li = this.append(base, name, type);
    let el_name = this.$('.sc-name', li);
    let el_icon = this.$('.sc-icon', li);

    ul.appendChild(li);
    this.onClickName(el_name);
    this.onClickFolder(el_icon);

    this.sort(ul);
  }

  delete(id, type) {
    let li = this.$('[data-sc-name="' + id + '"][data-sc-type="' + type + '"]');
    li.remove();
  }

  rename(id, name, type) {
    let li = this.$('[data-sc-name="' + id + '"][data-sc-type="' + type + '"]');
    let new_id = id.slice(0, id.lastIndexOf("/")+1) + name;
    this.$('.sc-name', li).innerHTML = name;
    li.dataset.scName = new_id;
    this.sort(li.closest('ul'));
  }

  close(id) {
    let el = this.$('[data-sc-name="' + id + '"]');
    el.dataset.scState = 'close';
    this.callback('toggle', this.setData(el));
  }

  open(id) {
    this.options();
    let ids = id.split('/');
    let append = '';
    let full_ids = [];
    
    for(let part in ids) {
      append += ids[part] + '/';
      full_ids[part] = this.trimSlashes(append);
    }

    this.ajax(full_ids);
  }

  select(id, type) {
    this.options();
    let el = this.$('[data-sc-name="' + id + '"][data-sc-type="' + type + '"]');
    let data = this.setData(el);
      
    this.removeActive();
    this.setActive(el);

    this.callback('select', data);
  }

  deselect() {
    this.options();
    this.removeActive();
    this.callback('select');
  }

  sort(ul) {
    let lis = this.$$('li', ul);

    [].slice.call(lis).sort(function(a, b) {
        var name1 = a.getAttribute('data-sc-name');
        var name2 = b.getAttribute('data-sc-name');
        var type1 = a.getAttribute('data-sc-type');
        var type2 = b.getAttribute('data-sc-type');

        if(type1 != type2) {
          if(type1 == 'folder') {
            return -1;
          } else {
            return 1;
          }
        }

        if(name1 < name2) {
          return -1;
        } else if(name1 > name2) {
          return 1;
        } else {
          return 0;
        }
    })
    .forEach(function(el) {
      el.parentNode.appendChild(el);
    });
  }

  append(base, name, type) {
    let li = this.createLi(name);
    let id = this.trimSlashes(base + '/' + name);
    li.dataset.scType = type;
    li.dataset.scName = id;
    return li;
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // Create list
  createList(array, parentName) {
    let ul = document.createElement('ul'); 
    let data = this.toFilesFolders(array);

    ul.dataset.scChildren = '';

    data.folders.forEach((item) => {
      let li = this.append(parentName, item, 'folder');
      ul.appendChild(li);
    });

    data.files.forEach((item) => {
      let li = this.append(parentName, item, 'file');
      ul.appendChild(li);
    });

    return ul;
  };

  createLi(item) {
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
  toFilesFolders(array) {
    let data = [];
    
    data.folders = [];
    data.files = [];

    let i = 0;
    
    array.forEach((item) => {
      if(this.isFolder(item)) {
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
  isFolder(item) {
      return (item[item.length - 1] == '/') ? true: false;
  };

  onClickName(el_name) {
    el_name.addEventListener('click', (e) => {
      let el = e.currentTarget.closest('li');
      let data = this.setData(el);
      
      this.removeActive();
      this.setActive(el);

      this.callback('select', data);
    });
  }

  onClickToggle(el_icon) {
    el_icon.addEventListener('click', (e) => {
      let el = e.currentTarget.closest('li');
      let li = el.closest('li');
      let state = li.dataset.scState;
      let data = this.setData(el);

      if(state == 'open') {
        li.dataset.scState = 'close';
      } else {
        li.dataset.scState = 'open';
      }

      data.state = li.dataset.scState;
      this.callback('toggle', data);
    });
  }

  onClickFolder(el_icon) {
    el_icon.addEventListener('click', (e) => {
      let el = e.currentTarget.closest('[data-sc-name]');

      if(el.dataset.scChildren === undefined) {
        let name = el.dataset.scName;
        let id = this.trimSlashes(name);
        this.ajax(id);
      }
    });
  }

  // Event click name
  ajaxClickName(id) {
    let selector_current = this.o.selector + '[data-sc-name="' + id + '"] > ul > li > .sc-current > .sc-name';
    let selector_children = this.o.selector + ' [data-sc-name="' + id + '"] > ul > li > .sc-current > .sc-name';
    let selector = selector_current + ', ' + selector_children;
    let elements = this.$$(selector);

    elements.forEach((element) => {
     this.onClickName(element);
    });
  };

  // Click toggle loaded folders
  ajaxClickToggle(current) {
    let id = current.dataset.scName;
    let element = this.$(this.o.selector + '[data-sc-name="' + id + '"] > .sc-current > .sc-icon,' + this.o.selector + ' [data-sc-name="' + id + '"] > .sc-current > .sc-icon');

    if(element) {
      this.onClickToggle(element);
    }
  };

  // Event click folder 
  ajaxClickFolder(current) {
    let elements = current.querySelectorAll('li[data-sc-type="folder"]:not([data-sc-children]) .sc-icon');
    
    elements.forEach((element) => {
      this.onClickFolder(element);
    });
  };

  // Trim slashes
  trimSlashes(str) {
      return str.replace(/^\/+|\/+$/g, '');
  };

  // Set info callback data
  setData(el) {
    let data = {};
    data.id = el.dataset.scName;
    data.element = el;
    data.type = el.dataset.scType;

    return data;
  };


  // Remove active
  removeActive() {
    let elements = this.$$(this.o.selector + ' li');

    elements.forEach(function(element) {
        delete element.dataset.scActive;
    });
  };

  // Set active
  setActive(element) {
      element.dataset.scActive = '';
  };
}

document.addEventListener("DOMContentLoaded", () => {
  let staircase = new StaircaseCore();
  staircase.load();
});