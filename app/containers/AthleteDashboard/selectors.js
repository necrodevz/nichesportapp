import { createSelector } from 'reselect';

/**
 * Direct selector to the athleteDashboard state domain
 */
const selectAthleteDashboardDomain = () => (state) => state.get('athleteDashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AthleteDashboard
 */

const makeSelectAthleteDashboard = () => createSelector(
  selectAthleteDashboardDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAthleteDashboard;
export {
  selectAthleteDashboardDomain,
};
