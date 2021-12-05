import { DEFAULT_INSTANCE_ID } from './constants';
import bus from './bus';

const instances = new Map();

export default function(instanceId = DEFAULT_INSTANCE_ID) {
  let instance = instances.get(instanceId);

  if (instance) return instance;

  instance = bus();

  instances.set(instanceId, instance);

  return instance;
}
