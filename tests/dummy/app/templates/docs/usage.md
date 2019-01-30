# Usage

The addon makes a `star-rating` component accessible in your consuming Ember app. You should pass it the item the rating should be set on, the rating property itself and the action that should be fired when one of the stars is clicked by the user.

{{#docs-snippet name="basic-usage.hbs"}}
  {{star-rating
    item=song
    rating=song.rating
    on-click=(action "updateRating")
  }}
{{/docs-snippet}}

Optionally, you can pass the maximum rating (the number of stars to be drawn, which is 5 by default):

{{#docs-snippet name="usage-with-maxrating.hbs"}}
  {{star-rating
    item=song
    rating=song.rating
    on-click=(action "updateRating")
    maxRating=10
  }}
{{/docs-snippet}}

If you use the component in the non-block form (like above), the appropriate glyphicon classes ('glyphicon-star' and ''glyphicon-star-empty') will be added to each star's tag, so you'll need to have the glyphicons fonts pulled in to display them correctly.

In the block form, the component yields back the stars (where `star.full` is a boolean) and the `set` action that will be called when any of the stars is clicked:

{{#docs-snippet name="block-usage.hbs"}}
  {{#star-rating
    item=song
    rating=song.rating
    on-click=(action "updateRating") as |stars set|
  }}
    {{#each stars as |star|}}
      <a {{action set star.rating}}>
        {{#if star.full}}
          *
        {{else}}
          _
        {{/if}}
      </a>
    {{/each}}
  {{/star-rating}}
{{/docs-snippet}}

The action you pass (`updateRating` in the above example) will be called with a params hash that has an `item` and a `rating` key. `item` is the item that was clicked and `rating` is the new rating value. You can then handle the action as you wish:

{{#docs-snippet name="action-passing.js"}}
import Controller from '@ember/controller'

export default Controller.extend({
  (...)
  actions: {
    updateRating(params) {
      let { item: song, rating } = params;
      song.set('rating', rating);
      return song.save();
    }
  }
});
{{/docs-snippet}}

## Using other icons

You can use other glyphicons or font-awesome icons by specifying `fullClassNames` and `emptyClassNames` like this:

{{#docs-snippet name="other-icons.hbs"}}
  {{star-rating
    item=song
    rating=song.rating
    on-click="updateRating"
    fullClassNames='fa fa-star'
    emptyClassNames='fa fa-star-o'
  }}
{{/docs-snippet}}

If you want to do this globally you can create your own component by creating a `app/components/star-rating-fa.js` file with the following content:

{{#docs-snippet name="override-class-names"}}
  import StarRatingComponent from 'ember-cli-star-rating/components/star-rating';

  export default StarRatingComponent.extend({
    fullClassNames: 'fa fa-star',
    emptyClassNames: 'fa fa-star-o'
  });
{{/docs-snippet}}
```

Then use it like this:

{{#docs-snippet name="overridden-class-usage"}}
{{star-rating-fa
  item=song
  rating=song.rating
  on-click="updateRating"
}}
{{/docs-snippet}}
