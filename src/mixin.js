import beam from '@crishellco/beam';

export const mixinFactory = () => {
  return {
    computed: {
      $beam() {
        return beam(this.$options.beamInstanceId);
      },
    },
  };
};
