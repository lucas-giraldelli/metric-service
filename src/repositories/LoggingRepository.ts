import { isThisHour, parseISO } from 'date-fns';
import Logging from '../models/Logging';
import connection from '../database/connection';

class LoggingRepositories {
  public async listMetricByLastHourAndSum(
    metric: string,
  ): Promise<number | undefined> {
    const getMetrics: Logging[] = await connection('loggings').where({
      metric,
    });

    const sumLastHour = getMetrics
      .filter(eachMetric => {
        const parsedDate = parseISO(eachMetric.created_at);
        return isThisHour(parsedDate);
      })
      .map(eachMetric => {
        return eachMetric.value;
      })
      .reduce((total, acc) => {
        return total + acc;
      });

    return sumLastHour || undefined;
  }

  public async listAll(): Promise<Logging[] | undefined> {
    const logs: Logging[] = await connection('loggings').select('*');

    return logs || undefined;
  }

  // public findByDateAndHour() {}

  public async create(metric: string, value: number): Promise<Logging> {
    const logging = new Logging(metric, value);

    await connection('loggings').insert(logging);

    return logging;
  }
}

export default LoggingRepositories;
