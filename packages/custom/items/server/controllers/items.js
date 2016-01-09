'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Item = mongoose.model('Item'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Items) {

    return {
        /**
         * Find item by id
         */
        item: function(req, res, next, id) {
            Item.load(id, function(err, item) {
                if (err) return next(err);
                if (!item) return next(new Error('Failed to load item ' + id));
                req.item = item;
                next();
            });
        },
        /**
         * Create an item
         */
        create: function(req, res) {
            var item = new Item(req.body);
            item.user = req.user;

            item.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the item'
                    });
                }

                Items.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/items/' + item._id,
                    name: item.title
                });

                res.json(item);
            });
        },
        /**
         * Update an item
         */
        update: function(req, res) {
            var item = req.item;

            item = _.extend(item, req.body);


            item.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the item'
                    });
                }

                Items.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: item.title,
                    url: config.hostname + '/items/' + item._id
                });

                res.json(item);
            });
        },
        /**
         * Delete an item
         */
        destroy: function(req, res) {
            var item = req.item;


            item.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the item'
                    });
                }

                Items.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: item.title
                });

                res.json(item);
            });
        },
        /**
         * Show an item
         */
        show: function(req, res) {

            Items.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.item.title,
                url: config.hostname + '/items/' + req.item._id
            });

            res.json(req.item);
        },
        /**
         * List of Items
         */
        all: function(req, res) {
            var query = req.acl.query('Item');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, items) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the items'
                    });
                }

                res.json(items)
            });

        }
    };
}