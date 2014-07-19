# jquery.storage [![spm version](http://spmjs.io/badge/jquery.storage)](http://spmjs.io/package/jquery.storage)
AUTHOR WEBSITE: [http://ydr.me/](http://ydr.me/)

客户端本地存储，包括localStorage 或 sessionStorage

__IT IS [A spm package](http://spmjs.io/package/jquery.storage).__




#USAGE
```
var $ = require('jquery');
require('jquery.storage')($);


// 1. options
$.storage(options);


// 2. get
$.storage().get();
$.storage().get("a");
$.storage().get(["a","b"]);


// 3. set
$.storage().set("a","11");
$.storage().set({"a":"111","b":"222"});


// 4. remove
$.storage().remove("a");
$.storage().remove(["a", "b"]);


// 5. clear
$.storage().clear();


// 6. bind unbind
$.storage().bind("a", fn);
$.storage().unbind("a", fn);
```



#DEFAULTS
```
$.storage.defaults = {
    // 默认为 localStorage，可选 session为sessionStorage
    type: 'local'
};
```
