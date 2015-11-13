'use strict';

/**
 * Function that would enable stringifying Error objects
 */
function jsonifyError(){
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = {};

            Object.getOwnPropertyNames(this).forEach(function (key) {
                alt[key] = this[key];
            }, this);

            return alt;
        },
        configurable: true
    });
};


module.exports = jsonifyError();

