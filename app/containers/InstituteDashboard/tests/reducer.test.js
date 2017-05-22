
import { fromJS } from 'immutable';
import instituteDashboardReducer from '../reducer';

describe('instituteDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(instituteDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
