import busFactory from './bus-factory';

export const mixinFactory = () => {
  return {
    computed: {
      $beam() {
        return busFactory(this.$options.beamInstanceId);
      },
    },
  };
};
