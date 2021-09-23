import React , {Component} from 'react';
import {render ,screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import {ApplyUserPrefButton} from "../ApplyUserPrefButton";
import userEvent from '@testing-library/user-event';


describe('Apply User Preference Button Component Testing' , ()=>{
    it('should render Save User preference Component without crashing' , ()=>{
        const componentUnderTest = render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        expect(componentUnderTest).toBeInTheDocument;
    });
    it('should contain Apply User preference Button' , ()=>{
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        const componentUnderTest = screen.getAllByTestId("applyPrefBtn");
        expect(componentUnderTest).toBeInTheDocument;
    });
    it('should display Apply Preference text' , ()=>{
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        const component = screen.getByTestId("applyPrefBtn");
        expect(component.textContent).toBe("Apply Preference");
    });

    it ('should test button click for successfully applying preferences' , ()=>{
        let mockClickCount = 0;
        let mockResetCount = 0;
        const mockClick = ()=>{
             mockClickCount++;
            };
        const mockReset = ()=>{
            mockResetCount++;
        }
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : true,
            saveUserLoadingStatus : false,
            };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        const {getByTestId} = render(<ApplyUserPrefButton
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
            handleApplyButtonClick = {mockClick}
            resetFetchPrefStatus = {mockReset}
            />);
        userEvent.click(getByTestId("applyPrefBtn"));
        expect(mockClickCount).toBeGreaterThanOrEqual(1);
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
        
    });

    it ('should test button click for some error in applying preferences' , ()=>{
        let mockClickCount = 0;
        let mockResetCount = 0;
        const mockClick = ()=>{
             mockClickCount++;
            };
        const mockReset = ()=>{
            mockResetCount++;
        }
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : true,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : true,
            saveUserErrorStatus : false,
        };
        const {getByTestId} = render(<ApplyUserPrefButton
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
            handleApplyButtonClick = {mockClick}
            resetFetchPrefStatus = {mockReset}
            />);
        userEvent.click(getByTestId("applyPrefBtn"));
        expect(mockClickCount).toBeGreaterThanOrEqual(1);
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
    });
});