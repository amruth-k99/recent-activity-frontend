import moment from 'moment';

export const commonDate = (date: Date) => moment(date).format('MMM DD');
