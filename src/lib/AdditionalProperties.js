import Schema from './Schema';
import InstanceKeyword from './InstanceKeyword';

export default class AdditionalProperties extends InstanceKeyword {
  constructor(value) {
    super();
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (typeof value == 'boolean' || typeof value == 'object' || value instanceof Schema) {
      this._value = value;
    } else {
      throw new Error('value must be an boolean value or a Schema instance');
    }
  }

  build(context) {
    const value = (this.value instanceof Schema)
        ? this.value.build({})
        : this.value;

    context['additionalProperties'] = value;

    return context;
  }
}

