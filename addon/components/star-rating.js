import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/star-rating';

export default Component.extend({
  tagName: 'div',
  classNames: ['rating-panel'],

  layout: layout,

  rating:     0,
  maxRating:  5,
  item:       null,
  "on-click": null,

  fullClassNames: 'glyphicon glyphicon-star',
  emptyClassNames: 'glyphicon glyphicon-star-empty',

  stars: computed('rating', 'maxRating', function() {
      let rating = this.get('rating');
      let end = this.get('maxRating')
      let starsArray = [];
      for (let i = 0; i < end ; i++) {
        starsArray.push({ rating: i+1, full: i < rating });
      }
      return starsArray;
    }),

  actions: {
    setRating: function(newRating) {
      let actionType = typeof this.attrs['on-click'];
      if (actionType === 'function') {
        this.attrs['on-click']({
          item: this.get('item'),
          rating: newRating
        });
      } else {
        this.sendAction('on-click', {
          item: this.get('item'),
          rating: newRating
        });
      }
    }
  }
});
