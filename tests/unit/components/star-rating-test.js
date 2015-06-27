import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

function filterFull(stars) {
  return stars.filter(function(star) { return star.full; });
}

function filterEmpty(stars) {
  return stars.filter(function(star) { return !star.full; });
}

function mapRating(stars) {
  return stars.map(function(star) { return star.rating; });
}

moduleForComponent('star-rating', 'Unit | Component | star rating', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('Calculates the full and empty stars correctly', function(assert) {
  assert.expect(9);

  var component = this.subject({
    rating: 4,
    maxRating: 5
  });

  var stars = component.get('stars');
  var fullStars = filterFull(stars);
  var emptyStars = filterEmpty(stars);

  assert.equal(stars.length, 5, "The number of stars matches maxRating");
  assert.equal(fullStars.length, 4, "The number of full stars is calculated correctly");
  assert.equal(emptyStars.length, 1, "The number of empty stars is calculated correctly");
  assert.deepEqual(mapRating(fullStars), [1, 2, 3, 4], "The full stars have the correct ratings");
  assert.deepEqual(mapRating(emptyStars), [5], "The empty stars have the correct ratings");

  component.set('rating', 2);

  stars = component.get('stars');
  fullStars = filterFull(stars);
  emptyStars = filterEmpty(stars);

  assert.equal(fullStars.length, 2, "The number of full stars is calculated correctly");
  assert.equal(emptyStars.length, 3, "The number of empty stars is calculated correctly");
  assert.deepEqual(mapRating(fullStars), [1, 2], "The full stars have the correct ratings");
  assert.deepEqual(mapRating(emptyStars), [3, 4, 5], "The empty stars have the correct ratings");
});

