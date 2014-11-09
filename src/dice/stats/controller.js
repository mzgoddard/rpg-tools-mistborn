module.exports = Ember.ArrayController.extend({

  queryParams: {
    'statsMode': 'stats-mode',
  },

  needs: ['dice'],
  diceController: Ember.computed.alias('controllers.dice'),

  // 'alone'
  statsMode: 'same-and-up',

  sameAndUp: Ember.computed.alias('diceController.optionsTable'),
  alone: Ember.computed.alias('diceController.samePercentTable'),
  columns: Ember.computed.alias('diceController.pairTable'),

  model: function() {
    var mode = this.get('statsMode');
    mode = mode.replace(/-(\w)/g, function(match) {
      return match[1].toUpperCase();
    });
    console.log(mode, this.get(mode));
    return this.get(mode);
  }.property('statsMode'),

});
