import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly with integer ratings', async function(assert) {
    let song = EmberObject.create({ rating: 4 });
    this.set('song', song);
    this.set('maxRating', 5);

    await render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

    assert.dom('.glyphicon-star').exists({ count: 4 }, "The right amount of full stars is rendered");
    assert.dom('.glyphicon-star-empty').exists({ count: 1 }, "The right amount of empty stars is rendered");

    this.set('maxRating', 10);
    assert.dom('.glyphicon-star').exists({ count: 4 }, "The right amount of full stars is rendered after changing maxRating");
    assert.dom('.glyphicon-star-empty').exists({ count: 6 }, "The right amount of empty stars is rendered after changing maxRating");

    this.set('song.rating', 2);
    assert.dom('.glyphicon-star').exists({ count: 2 }, "The right amount of full stars is rendered after changing rating");
    assert.dom('.glyphicon-star-empty').exists({ count: 8 }, "The right amount of empty stars is rendered after changing rating");
  });

  test('Applies the passed fullClassNames and emptyClassNames', async function(assert) {
    let song = EmberObject.create({ rating: 4 });
    this.set('song', song);
    this.set('maxRating', 5);

    await render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating fullClassNames='fa fa-star' emptyClassNames='fa fa-star-o'}}`);

    assert.dom('.fa-star').exists({ count: 4 }, "The right amount of full stars is rendered");
    assert.dom('.fa-star-o').exists({ count: 1 }, "The right amount of empty stars is rendered");
  });

  test('Renders the full and empty stars correctly with float ratings', async function(assert) {
    let song = EmberObject.create({ rating: 3.2 });
    this.set('song', song);
    this.set('maxRating', 5);

    await render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

    assert.dom('.glyphicon-star').exists({ count: 3 }, "The right amount of full stars is rendered");
    assert.dom('.glyphicon-star-empty').exists({ count: 2 }, "The right amount of empty stars is rendered");

    this.set('maxRating', 10);

    assert.dom('.glyphicon-star').exists({ count: 3 }, "The right amount of full stars is rendered after changing maxRating");
    assert.dom('.glyphicon-star-empty').exists({ count: 7 }, "The right amount of empty stars is rendered after changing maxRating");

    this.set('song.rating', 1.9);
    assert.dom('.glyphicon-star').exists({ count: 2 }, "The right amount of full stars is rendered after changing rating");
    assert.dom('.glyphicon-star-empty').exists({ count: 8 }, "The right amount of empty stars is rendered after changing rating");
  });

  test('Triggers the passed-in action when clicked', async function(assert) {
    let song = EmberObject.create({ rating: 4 }),
        clickedRating;

    this.set('song', song);
    this.set('maxRating', 5);

    this.actions = {
      updateRating(params) {
        clickedRating = params.rating;
      }
    };

    await render(hbs`{{star-rating item=song rating=song.rating on-click=(action "updateRating")}}`);

    let firstStar = document.querySelectorAll('.rating-star')[0];
    await click(firstStar);
    assert.equal(clickedRating, 1, "The `updateRating` action was called");
  });

  test('In block form, yields back the decorated stars', async function(assert) {
    let song = EmberObject.create({ rating: 4 });
    this.set('song', song);
    this.set('maxRating', 5);

    await render(hbs`
      {{#star-rating item=song rating=song.rating maxRating=maxRating as |stars|}}
        {{#each stars as |star|}}
          <span class="{{if star.full 'full-star' 'empty-star'}}"></span>
        {{/each}}
      {{/star-rating}}
    `);

    assert.dom('.full-star').exists({ count: 4 }, "The right amount of full stars is rendered");
    assert.dom('.empty-star').exists({ count: 1 }, "The right amount of empty stars is rendered");
  });

  test('In block form, calls the passed in `on-click` action', async function(assert) {
    let song = EmberObject.create({ rating: 4 });
    let clickedRating;

    this.set('song', song);
    this.set('maxRating', 5);
    this.actions = {
      updateRating: function(params) {
        clickedRating = params.rating;
      }
    };

    await render(hbs`
      {{#star-rating item=song rating=song.rating maxRating=maxRating on-click=(action "updateRating") as |stars setRating|}}
        {{#each stars as |star|}}
          <span
            class="rating-star"
            onclick={{action setRating star.rating}}>
            <span class="fa fa-star"></span>
          </span>
        {{/each}}
      {{/star-rating}}
    `);

    let firstStar = document.querySelectorAll('.rating-star')[0];
    await click(firstStar);
    assert.equal(clickedRating, 1, "The `updateRating` action was called");
  });
});
