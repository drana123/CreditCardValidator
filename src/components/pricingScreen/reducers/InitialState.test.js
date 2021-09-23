
import pricingAppReducer from './rootReducer';
import InitialState from './InitialState'


describe('authenticate reducer', () => {
    it('returns the initial state', () => {
        const newState = pricingAppReducer(undefined, {});
        expect(newState.apiStatus).toEqual(InitialState);
    });
})