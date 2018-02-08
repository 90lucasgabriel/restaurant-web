import { Day } from '@r-enum/day.enum';

export class AppConfig {
  public static DAYS = [
    {day: Day.SUNDAY,     name: 'Domingo'},
    {day: Day.MONDAY,     name: 'Segunda-feira'},
    {day: Day.TUESDAY,    name: 'Terça-feira'},
    {day: Day.WEDNESDAY,  name: 'Quarta-feira'},
    {day: Day.THURSDAY,   name: 'Quinta-feira'},
    {day: Day.FRIDAY,     name: 'Sexta-feira'},
    {day: Day.SATURDAY,   name: 'Sábado'}
  ];
}
