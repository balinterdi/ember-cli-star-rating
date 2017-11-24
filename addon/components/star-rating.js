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

  hoveredIndex: null,

  fullClassNames: 'glyphicon glyphicon-star',
  emptyClassNames: 'glyphicon glyphicon-star-empty',
  hoveredClassNames: 'glyphicon glyphicon-star star-rating-hovered',

  stars: computed('rating', 'maxRating', 'hoveredIndex', function() {
    var hoveredStars = [];
    var fullStars = [];
    var emptyStars = [];
    var rating = Math.round(this.get('rating'));
    var hoveredIndex = this.get('hoveredIndex');
    if (hoveredIndex === null) {
      fullStars = this.starRange(0, rating, this.get('fullClassNames'));
      emptyStars = this.starRange(rating, this.get('maxRating'), this.get('emptyClassNames'));
    } else {
      hoveredStars = this.starRange(0, hoveredIndex + 1, this.get('hoveredClassNames'));
      emptyStars = this.starRange(hoveredIndex + 1, this.get('maxRating'), this.get('emptyClassNames'));
    }
    return hoveredStars.concat(fullStars).concat(emptyStars);
  }),

  starRange: function(start, end, className) {
    var starsData = [];
    for (var i = start; i < end; i++) {
      starsData.push({ rating: i+1, class: className });
    }
    return starsData;
  },

  actions: {
    setRating: function(newRating) {
      var actionType = typeof this.attrs['on-click'];
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
