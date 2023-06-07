import React from "react";

/**
 *  Creates a context that handles the Preferences of the User, such as the Color Mode and the Locale.
 */
export const userPrefsContext =
    React.createContext({
        toggleColorMode: () => { },
        toggleLocale: () => { },
    })

/**
 *  Creates a context that has the ability to change the Stepper in Order to react to state changes on different Pages.
 */
export const StepperContext =
    React.createContext<{
        activeStep: number,
        completed: { [k: number]: boolean },
        handleNext: any,
        handleComplete: any,
        handleSuccess: any,
    }>({
        activeStep: 0,
        completed: {},
        handleNext: () => { },
        handleComplete: () => { },
        handleSuccess: () => { },
    })

/**
 *  Creates a context that stores data and make it read- and writeable to other Components.
 */
export const TableContext =
    React.createContext<{
        training_data: any[],
        test_data: any[],
        target: string,
        features: string[],
        addRow: any,
        addResult: any,
    }>({
        training_data: [],
        test_data: [],
        target: "",
        features: [],
        addRow: () => { },
        addResult: () => { },
    })
