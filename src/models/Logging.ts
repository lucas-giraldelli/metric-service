import { uuid } from 'uuidv4';

class Logging {
  id: string;

  metric: string;

  value: number;

  constructor(metric: string, value: number) {
    this.id = uuid();

    this.metric = metric;
    this.value = value;
  }
}

export default Logging;
