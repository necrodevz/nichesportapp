import { createSelector } from 'reselect';

/**
 * Direct selector to the instituteDashboard state domain
 */
const selectInstituteDashboardDomain = () => (state) => state.get('instituteDashboard');

/**
 * Other specific selectors
 */


/**
 * Default selector used by InstituteDashboard
 */

const makeSelectInstituteDashboard = () => createSelector(
  selectInstituteDashboardDomain(),
  (substate) => substate.toJS()
);

export default makeSelectInstituteDashboard;
export {
  selectInstituteDashboardDomain,
};
