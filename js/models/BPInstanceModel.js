var BPInstance = Backbone.Model.extend({

    _action:function(method, options) {
        var model = this;
        options = options || {};
        var error = options.error;
        options.success = function(resp) {
            model.trigger('sync', model, resp, options);
            if (options.callback!==undefined) {
                options.callback(resp);
            }
        };
        options.error = function(resp) {
            model.trigger('error', model, resp, options);
            if (error!==undefined) {
                error(model, resp);
            }
        };
        var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
        return xhr;
    },

    sync: function(method, model, options) {
        switch(method) {
            case "read":
                //BP.API.getBlueprintInstance(model.get('name'), options.success, options.error);
                break;
            case "create":
                BP.API.launchBlueprintInstance(model.toJSON(), options.success, options.error);
                break;
            case "delete":
                //BP.API.stopBlueprintInstance(model.get('name'), options.success, options.error);
                break;
            case "update":
           
                break;
            
        }
    }
});

var BPInstances = Backbone.Collection.extend({

    model: BPInstance,

    _action: function(method, options) {
        var model = this;
        options = options || {};
        options.success = function(resp) {
            model.trigger('sync', model, resp, options);
            if (options.callback!==undefined) {
                options.callback(resp);
            }
        };
        var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
        return xhr;
    },

    // getCatalogueProductDetails: function(options) {
    //     options = options || {};
    //     return this._action('getCatalogueProductDetails', options);
    // },

    sync: function(method, model, options) {
        switch(method) {
            case "read":
                BP.API.getBlueprintInstanceList(options.success, options.error);
                break;
            case 'getCatalogueProductDetails':
                // ServiceDC.API.getProductAttributes(options.id, options.success, options.error);
                break;
        }
    },

    parse: function(resp) {
        return resp;
    }
});