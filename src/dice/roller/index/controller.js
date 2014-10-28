const probability = require('../../../utils/dicemath').probability;

module.exports = Ember.ArrayController.extend({
  needs: ['dice'],
  diceController: Ember.computed.alias('controllers.dice'),

  diceOptions: Ember.computed.alias('diceController.optionsTable'),

  roll: function(diceCount) {
    var dice = [];
    while (diceCount--) {
      dice.push(Ember.Object.create({
        roll: Math.floor(Math.random() * 6) + 1,
      }));
    }
    return RollSet.create({ rolls: dice });
  },

  actions: {
    rollDice: function(dice) {
      this.get('model').unshiftObject(this.roll(dice));
    },
  },
});

var RollSet = Ember.Object.extend({
  rolls: null,

  highestPair: function() {
    var rollsLength = this.get('rolls.length');
    var counts = new Array(6);
    for (var i = 0; i < rollsLength; i++) {
      var roll = this.get('rolls.' + i + '.roll');
      counts[roll - 1] = counts[roll - 1] ? counts[roll - 1] + 1 : 1;
    }
    for (var i = 4; i > 0; i--) {
      if (counts[i] >= 2) {
        return i + 1;
      }
    }
    return 0;
  }.property('rolls.[]'),

  nudges: function() {
    var rollsLength = this.get('rolls.length');
    var nudges = 0;
    for (var i = 0; i < rollsLength; i++) {
      var roll = this.get('rolls.' + i + '.roll');
      if (roll === 6) {
        nudges++;
      }
    }
    return nudges;
  }.property('rolls.[]'),

  highestPairChance: function() {
    if (this.get('highestPair') === 0) {
      return 1 - probability(1, this.get('rolls.length'));
    }
    return probability(this.get('highestPair'), this.get('rolls.length'));
  }.property('highestPair'),

  highestPairChancePercent: function() {
    return Math.floor(this.get('highestPairChance') * 100);
  }.property('highestPairChance'),
});
