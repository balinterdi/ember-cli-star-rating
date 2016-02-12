# ember-cli-star-rating
[![Build Status](https://travis-ci.org/balinterdi/ember-cli-star-rating.svg?branch=master)](https://travis-ci.org/balinterdi/ember-cli-star-rating)

An Ember CLI addon for using stars to manage ratings in your glorious Ember application.

## Installation

As this is an Ember addon, you just need to do:

    ember install ember-cli-star-rating

Reload your app and you're ready to reach for the stars!

## Usage

The addon makes a `star-rating` component accessible in your consuming Ember
app. You should pass it the item the rating should be set on, the rating
property itself and the action that should be fired when one of the stars is
clicked by the user.

```hbs
{{star-rating item=song rating=song.rating on-click="updateRating"}}
```

You can also use a closure action, if you prefer:

```hbs
{{star-rating item=song rating=song.rating on-click=(action "updateRating")}}
```

Optionally, you can pass the maximum rating (the number of stars to be drawn, which is 5 by default):

```hbs
{{star-rating item=song rating=song.rating on-click=(action "updateRating") maxRating=10}}
```

If you use the component in the non-block form (like above), the appropriate
glyhphicon classes ('glyphicon-star' and ''glyphicon-star-empty') will be added
to each star's tag, so you'll need to have the glyphicons fonts pulled in to
display them correctly.

In the block form, the component yields back the stars (where `star.full` is a
boolean) and the `set` action that will be called when any of the stars is
clicked:

```hbs
{{#star-rating item=song rating=song.rating on-click=(action "updateRating")  as |stars set|}}
  {{#each stars as |star|}}
    <a {{action set star.rating}}>
      {{if star.full}}*{{else}}_{{/if}}
    </a>
  {{/each}}
{{/star-rating}
```

The action you pass (`updateRating` in the above example) will be called with a
params hash that has an `item` and a `rating` key. `item` is the item that was
clicked and `rating` is the new rating value. You can then handle the action as
you wish:

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  (...)
  actions: {
    updateRating(params) {
      const { item: song, rating } = params;
      song.set('rating', rating);
      return song.save();
    }
  }
});
```

## Using other icons

You can use other glyphicons or font-awesome icons by specifying `fullClassNames` and `emptyClassNames` like this:

```hbs
{{star-rating item=song rating=song.rating on-click="updateRating" fullClassNames='fa fa-star' emptyClassNames='fa fa-star-o'}}
```

If you want to do this globally you can create your own component by creating a `app/components/star-rating-fa.js` file with the following content:

```js
import StarRatingComponent from 'ember-cli-star-rating/components/star-rating';

export default StarRatingComponent.extend({

  fullClassNames: 'fa fa-star',
  emptyClassNames: 'fa fa-star-o'

});
```

Then use it like this:

```hbs
{{star-rating-fa item=song rating=song.rating on-click="updateRating"}}
```

## Contributing

I'm happy to consider changes and accept feature requests. If you submit a PR, please
include tests in `tests/integration/components/star-rating-test.js`.

Ember CLI now makes it joyfully simple to write integration tests. You can check
out the [current tests][1] or [this blog post][2] to see how.

## Running Tests

You can run your tests by typing `ember test` in the addon or launching `ember
serve` and then going to `http://localhost:4200` to see the tests run.

[1]: https://github.com/balinterdi/ember-cli-star-rating/tree/master/tests/integration/components
[2]: http://alisdair.mcdiarmid.org/2015/06/20/ember-component-integration-tests.html
