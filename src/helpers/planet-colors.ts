import {ICircleStyleSVG} from './circle';

export const planetStyle = ({climate}: IPlanet): Partial<ICircleStyleSVG> => {
  if (climate.includes('frozen')) {
    return {stroke: '#00BCD4', strokeWidth: 2, fill: '#0D47A1'};
  } else if (climate.includes('arid')) {
    return {stroke: '#D7CCC8', strokeWidth: 2, fill: '#BCAAA4'};
  } else if (climate.includes('temperate')) {
    return {stroke: '#81C784', strokeWidth: 2, fill: '#00695C'};
  } else if (climate.includes('murky')) {
    return {stroke: '#607D8B', strokeWidth: 2, fill: '#37474F'};
  } else if (climate.includes('tropical')) {
    return {stroke: '#E6EE9C', strokeWidth: 2, fill: '#CDDC39'};
  } else if (climate.includes('frigid')) {
    return {stroke: '#0D47A1', strokeWidth: 2, fill: '#00BCD4'};
  } else if (climate.includes('humid')) {
    return {stroke: '#1976D2', strokeWidth: 2, fill: '#00BFA5'};
  } else if (climate.includes('hot')) {
    return {stroke: '#c62828', strokeWidth: 2, fill: '#FF8A65'};
  } else if (climate.includes('polluted')) {
    return {stroke: '#607D8B', strokeWidth: 2, fill: '#CFD8DC'};
  } else if (climate.includes('unknown')) {
    return {stroke: '#c62828', strokeWidth: 2, fill: '#fff'};
  } else if (climate.includes('superheated')) {
    return {stroke: '#ef5350', strokeWidth: 2, fill: '#c62828'};
  } else {
    return {stroke: '#E4AF4C', strokeWidth: 2, fill: '#F4D37D'};
  }
};
