
import { fromJS } from 'immutable';
import athleteDashboardReducer from '../reducer';

describe('athleteDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(athleteDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
