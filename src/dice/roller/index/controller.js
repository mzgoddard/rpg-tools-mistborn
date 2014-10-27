module.exports = Ember.ArrayController.extend({
  diceOptions: function() {
    var options = [];
    for (var i = 2; i <= 10; i++) {
      options.push(Ember.Object.createWithMixins({
        dice: i,

        chances: function() {
          var chances = [];
          for (var j = 0; j < 6; j++) {
            var probabilityValue = probability(j, this.get('dice'));
            if (j === 0) {
              probabilityValue = 1 - probability(1, this.get('dice'));
            }
            var percent = Math.floor(probabilityValue * 100);
            chances.push(Ember.Object.create({
              pair: j,
              percent: percent,
            }));
          }
          return chances;
        }.property(),

        chanceList: function() {
          return this.get('chances').reduce(function(v, a) {
            if (!v) {
              return a.get('pair') + ' ' + a.get('percent');
            }
            return v + ', ' + a.get('pair') + ' ' + a.get('percent');
          }, '');
        }.property('chances'),
      }));
    }
    return options;
  }.property(),

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

function factorial( n ) {
  return n > 1 ? n * factorial( n - 1 ) : 1;
}

function binom( n, k ) {
  return factorial( n ) / ( factorial( n - k ) * factorial( k ) );
}

function expand( pair, sides, dice, countSub2 ) {
  if ( dice === 0 ) {
    return 1;
  }
  if ( dice === 1 ) {
    return sides;
  }
  if ( sides === 1 ) {
    return 1;
  }
  var sum = 0, k;
  if ( sides > pair ) {
    k = 2;
    for ( ; k <= dice; k++ ) {
      sum += binom( dice, k ) * expand( pair, sides - 1, k );
    }
  } else {
    k = 0;
    for ( ; k <= dice; k++ ) {
      if ( countSub2 || dice - k >= 2 || k >= 2 ) {
        sum += binom( dice, k ) * expand( pair, sides - 1, k, countSub2 || dice - k > 1 );
      }
    }
  }

  return sum;
}

function probability( highest, dice ) {
  return expand( 6 - highest, 6, dice ) / Math.pow( 6, dice );
}
