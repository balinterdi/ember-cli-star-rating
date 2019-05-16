import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/star-rating';

export default Component.extend({
  tagName: 'div',
  classNames: ['rating-panel'],

  layout: layout,

  // @arguments
  rating:     0,
  maxRating:  5,
  item:       null,
  "on-click": null,

  fullClassNames: 'glyphicon glyphicon-star',
  emptyClassNames: 'glyphicon glyphicon-star-empty',

  stars: computed('rating', 'maxRating', function() {
    let rating = Math.round(this.get('rating'));
    let starsArray = [];
    for (let i=1; i <= this.get('maxRating'); i++) {
      starsArray.push({ rating: i, full: rating >= i });
    }
    return starsArray;
  }),

  actions: {
    setRating: function(newRating) {
      this.get('on-click')({
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});
