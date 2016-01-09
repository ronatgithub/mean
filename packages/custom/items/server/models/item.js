'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Item Schema
 */
var ItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: {
    type: Array
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
ItemSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ItemSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
ItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Item', ItemSchema);
