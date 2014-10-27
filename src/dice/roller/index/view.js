require('./style.styl');

module.exports = Ember.View.extend({
  // template: require('./template.hbs'),
  didInsertElement: function() {
    console.log('didInsertElement');
  },
});
