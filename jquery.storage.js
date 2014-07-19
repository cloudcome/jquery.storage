module.exports = function($) {
    'use strict';

    var udf,
        win = window,
        defaults = {
            // 默认为 localStorage，可选 session为sessionStorage
            type: 'local'
        },
        _type = $.type,
        _each = $.each,
        // 监听关系
        listenMap = {};

    $.storage = function(settings) {
        return new Storage($.extend({}, defaults, settings));
    };
    $.storage.defaults = defaults;

    function Storage(options) {
        this.storage = win[options.type + 'Storage'];
    }

    Storage.prototype = {
        /**
         * 设置1个或多个Storage
         * @param {String/Object} key 一个键或键值对
         * @param {String} val 值
         * @version 1.0
         * 2014年6月27日14:23:52
         */
        set: function(key, val) {
            var map = {},
                i;
            if (_type(key) === 'object') {
                map = key;
            } else {
                map[key] = val;
            }
            for (i in map)
                this.storage.setItem(i, map[i]);
        },




        /**
         * 获得1个或多个Storage
         * @param  {String/Array/Undefined} key 1个或多个键数组
         * @return {String/Object}              1个键值、1个或多个键值对
         * @version 1.0
         * 2014年6月27日17:27:03
         */
        get: function(key) {
            var i = 0,
                j, ret = {},
                that = this;

            // all
            if (key === udf) {
                j = that.storage.length;
                for (; i < j; i++) {
                    key = that.storage.key(i);
                    ret[key] = that.storage.getItem(key);
                }
                return ret;
            }
            // 多个
            else if (_isArray(key)) {
                _each(key, function(k, v) {
                    ret[v] = that.storage.getItem(v);
                });
                return ret;
            }
            // 单个
            else {
                return that.storage.getItem(key);
            }
        },



        /**
         * 移除1个或多个Storage
         * @param  {String/Array} key 1个或多个键数组
         * @version 1.0
         * 2014年6月27日14:23:52
         */
        remove: function(key) {
            var keys = _isArray(key) ? key : [key],
                that = this;
            _each(keys, function(k, v) {
                that.storage.removeItem(v);
            });
        },



        /**
         * 清空Storage
         * @version 1.0
         * 2014年6月27日14:23:52
         */
        clear: function() {
            return this.storage.clear();
        },



        /**
         * 添加1个key监听
         * @param  {String}   key      键
         * @param  {Function} callback 回调
         * @version 1.0
         * 2014年6月27日14:23:52
         */
        bind: function(key, callback) {
            if (!listenMap[key]) listenMap[key] = [];

            listenMap[key].push(callback);
        },




        /**
         * 移除1个key监听
         * @param  {String}   key      键
         * @param  {Function} callback 回调
         * 无回调时，删除所有回调
         * @version 1.0
         * 2014年6月27日14:23:52
         */
        unbind: function(key, callback) {
            if (!listenMap[key]) return;

            if (callback === udf) {
                delete(listenMap[key]);
                return;
            }

            var find = -1;
            _each(listenMap[key], function(index, fn) {
                if (fn === callback) {
                    find = index;
                    return !1;
                }
            });
            if (~find) listenMap[key].splice(find, 1);
        },
    };

    win.addEventListener('storage', function(e) {
        // e.key
        // e.oldValue
        // e.newValue
        if (listenMap[e.key]) {
            _each(listenMap[e.key], function(index, fn) {
                fn(e);
            });
        }
    });

    function _isArray(obj) {
        return _type(obj) === 'array';
    }
};
