import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('star-rating', 'Integration | Component | star rating', {
  integration: true
});

test('Renders the full and empty stars correctly', function(assert) {
  assert.expect(6);

  var song = Ember.Object.create({ rating: 4 });
  this.set('song', song);
  this.set('maxRating', 5);

  this.render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 1, "The right amount of empty stars is rendered");

  this.set('maxRating', 10);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered after changing maxRating");
  assert.equal(this.$('.glyphicon-star-empty').length, 6, "The right amount of empty stars is rendered after changing maxRating");

  this.set('song.rating', 2);
  assert.equal(this.$('.glyphicon-star').length, 2, "The right amount of full stars is rendered after changing rating");
  assert.equal(this.$('.glyphicon-star-empty').length, 8, "The right amount of empty stars is rendered after changing rating");
});

test('Triggers the passed-in action handler', function(assert) {
  assert.expect(1);

  var song = Ember.Object.create({ rating: 4 }),
      clickedRating;

  this.set('song', song);
  this.set('maxRating', 5);
  this.on("updateRating", function(rating) {
    clickedRating = rating;
  });

  this.render(hbs`{{star-rating item=song rating=song.rating setAction="updateRating"}}`);
  this.$('.star-rating').click();

  assert.ok(clickedRating, "The `updateRating` action was called");
});
