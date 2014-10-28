module.exports = function() {
  console.log('hi');
  this.resource('dice', function() {
    this.resource('dice.roller', {path: 'roller'}, function() {
      this.resource('dice.roller.index', {path: '/'});
    });
    this.resource('dice.stats', {path: 'stats'});
  });
};
