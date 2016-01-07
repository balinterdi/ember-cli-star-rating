import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('star-rating', 'Integration | Component | star rating', {
  integration: true
});

test('Renders the full and empty stars correctly with integers', function(assert) {
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

test('Renders the full and empty stars correctly with float ratings', function(assert) {
  assert.expect(6);

  var song = Ember.Object.create({ rating: 3.2 });
  this.set('song', song);
  this.set('maxRating', 5);

  this.render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

  assert.equal(this.$('.glyphicon-star').length, 3, "The right amount of full stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 2, "The right amount of empty stars is rendered");

  this.set('maxRating', 10);

  assert.equal(this.$('.glyphicon-star').length, 3, "The right amount of full stars is rendered after changing maxRating");
  assert.equal(this.$('.glyphicon-star-empty').length, 7, "The right amount of empty stars is rendered after changing maxRating");

  this.set('song.rating', 1.9);
  assert.equal(this.$('.glyphicon-star').length, 2, "The right amount of full stars is rendered after changing rating");
  assert.equal(this.$('.glyphicon-star-empty').length, 8, "The right amount of empty stars is rendered after changing rating");
});

test('Triggers the passed-in string action handler', function(assert) {
  assert.expect(1);

  var song = Ember.Object.create({ rating: 4 }),
      clickedRating;

  this.set('song', song);
  this.set('maxRating', 5);
  this.on("updateRating", function(params) {
    clickedRating = params.rating;
  });

  this.render(hbs`{{star-rating item=song rating=song.rating on-click="updateRating"}}`);
  this.$('.star-rating:first').click();

  assert.equal(clickedRating, 1, "The `updateRating` action was called");
});

test('Triggers the passed-in closure action handler', function(assert) {
  assert.expect(1);

  var song = Ember.Object.create({ rating: 4 }),
      clickedRating;

  this.set('song', song);
  this.set('maxRating', 5);

  this.actions = {
    updateRating: function(params) {
      clickedRating = params.rating;
    }
  };

  this.render(hbs`{{star-rating item=song rating=song.rating on-click=(action "updateRating")}}`);
  this.$('.star-rating:first').click();

  assert.equal(clickedRating, 1, "The `updateRating` action was called");
});

test('In block form, yields back the decorated stars', function(assert) {
  assert.expect(2);

  var song = Ember.Object.create({ rating: 4 });
  this.set('song', song);
  this.set('maxRating', 5);

  this.render(hbs`
    {{#star-rating item=song rating=song.rating maxRating=maxRating as |stars|}}
      {{#each stars as |star|}}
        <span class="{{if star.full 'full-star' 'empty-star'}}"></span>
      {{/each}}
    {{/star-rating}}
  `);

  assert.equal(this.$('.full-star').length, 4, "The right amount of full stars is rendered");
  assert.equal(this.$('.empty-star').length, 1, "The right amount of empty stars is rendered");
});

test('In block form, calls the passed in `on-click` action', function(assert) {
  assert.expect(1);

  var song = Ember.Object.create({ rating: 4 });
  var clickedRating;

  this.set('song', song);
  this.set('maxRating', 5);
  this.actions = {
    updateRating: function(params) {
      clickedRating = params.rating;
    }
  };

  this.render(hbs`
    {{#star-rating item=song rating=song.rating maxRating=maxRating on-click=(action "updateRating") as |stars set|}}
      {{#each stars as |star|}}
        <a class="star-rating" onclick={{action set star.rating}}><span class="fa fa-star"></span></a>
      {{/each}}
    {{/star-rating}}
  `);
  this.$('.star-rating:first').click();

  assert.equal(clickedRating, 1, "The `updateRating` action was called");
});
