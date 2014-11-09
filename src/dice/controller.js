const binom = require('../utils/dicemath').binom;
const probabilityOne = require('../utils/dicemath').probabilityOne;
const probabilityInvert0 = require('../utils/dicemath').probabilityInvert0;

module.exports = Ember.ObjectController.extend({

  optionsTable: function() {
    var options = [];
    for (var i = 2; i <= 10; i++) {
      var chances = [];
      for (var j = 0; j < 6; j++) {
        var probabilityValue = probabilityInvert0(j, i);
        var percent = Math.floor(probabilityValue * 100);
        // var samePercent = Math.floor(binom(i, 2) / Math.pow(6, i) * 100);
        var samePercent = percent;
        if (j > 0 && j < 5) {
          // samePercent = Math.floor(probabilityOne(j, i) * 100);
          samePercent = Math.floor(
            (probabilityValue - probabilityInvert0(j + 1, i)) * 100
          );
        }
        chances.push(Ember.Object.create({
          pair: j,
          percent: percent,
          samePercent: samePercent,
        }));
      }

      var chanceList = chances.reduce(function(v, a) {
        if (!v) {
          return a.get('pair') + ' ' + a.get('percent');
        }
        return v + ', ' + a.get('pair') + ' ' + a.get('percent');
      }, '');

      options.push(Ember.Object.create({
        dice: i,
        chances: chances,
        chanceList: chanceList,
      }));
    }
    return options;
  }.property(),

  samePercentTable: function() {
    return this.get('optionsTable').map(function(dice) {
      var props = dice.getProperties(Ember.keys(dice));
      props.chances = props.chances.map(function(chance) {
        var props = chance.getProperties(Ember.keys(chance));
        props.percent = props.samePercent;
        return Ember.Object.create(props);
      });
      return Ember.Object.create(props);
    });
  }.property('optionsTable'),

  pairTable: function() {
    var options = [];
    for (var i = 0; i < 6; i++) {
      var dice = [];
      for (var j = 2; j < 10; j++) {
        var probabilityValue = probabilityInvert0(i, j);
        var percent = Math.floor(probabilityValue * 100);
        dice.push(Ember.Object.create({
          dice: j,
          percent: percent,
        }));
      }

      options.push(Ember.Object.create({
        pair: i,
        chances: dice,
      }));
    }

    return options;
  }.property(),

});
