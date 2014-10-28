module.exports = Ember.ArrayController.extend({

  needs: ['dice'],
  diceController: Ember.computed.alias('controllers.dice'),

  model: Ember.computed.alias('diceController.optionsTable'),
  columns: Ember.computed.alias('diceController.pairTable'),

});
