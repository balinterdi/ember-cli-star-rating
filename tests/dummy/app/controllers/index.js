import Controller from '@ember/controller';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

export default Controller.extend({
  song: computed(function() {
    return EmberObject.create({
      rating: 3
    });
  }),

  actions: {
    updateSongRating({ rating }) {
      this.get('song').set('rating', rating);
    }
  }
});
