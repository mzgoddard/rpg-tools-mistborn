const probabilityInvert0 = require('../utils/dicemath').probabilityInvert0;

module.exports = Ember.ObjectController.extend({

  optionsTable: function() {
    var options = [];
    for (var i = 2; i <= 10; i++) {
      var chances = [];
      for (var j = 0; j < 6; j++) {
        var probabilityValue = probabilityInvert0(j, i);
        var percent = Math.floor(probabilityValue * 100);
        chances.push(Ember.Object.create({
          pair: j,
          percent: percent,
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
