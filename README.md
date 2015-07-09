# ember-cli-star-rating

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
{{star-rating item=song rating=song.rating setAction="updateRating"}}
```

Optionally, you can pass the maximum rating (the number of stars to be drawn, which is 5 by default):

```hbs
{{star-rating item=song rating=song.rating setAction="updateRating" maxRating=10}}
```

If you use the component in the non-block form (like above), the appropriate
glyhphicon classes ('glyphicon-star' and ''glyphicon-star-empty') will be added
to each star's tag, so you'll need to have the glyphicons fonts pulled in to
display them correctly.

In the block form, the stars are just yielded back, each with their rating and
'fullness':

```hbs
{{#star-rating item=song rating=song.rating as |star|}}
  {{star.rating}} is full: {{star.full}}
{{/star-rating}}
```

That's it!

## Contributing

I'm happy to consider changes and accept feature requests (although the problem
space this lib aims to solve is fairly limited :)). If you submit a PR, please
include tests in `tests/integration/components/star-rating-test.js`.

Ember CLI now makes it joyfully simple to write integration tests. You can check
out the [current tests][1] or [this blog post][2] to see how.

## Running Tests

You can run your tests by typing `ember test` in the addon or launching `ember
serve` and then going to `http://localhost:4200` to see the tests run.

[1]: https://github.com/balinterdi/ember-cli-star-rating/tree/master/tests/integration/components
[2]: http://alisdair.mcdiarmid.org/2015/06/20/ember-component-integration-tests.html
