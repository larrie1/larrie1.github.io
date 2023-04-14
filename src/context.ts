import React from "react";

export const userPrefsContext = React.createContext({ toggleColorMode: () => { }, toggleLocale: () => { } })

export const StepperContext = React.createContext<{activeStep: number, completed: { [k: number]: boolean }, handleNext: any, handleComplete: any, handleSuccess: any}>({
    activeStep: 0,
    completed: {},
    handleNext: () => {},
    handleComplete: () => {},
    handleSuccess: () => {},
})

export const TableContext = React.createContext<{ data: any[], target: string, features: any[], addRow: any, addResult: any }>(
    {
        data: [],
        target: "",
        features: [],
        addRow: () => { },
        addResult: () => { },
    }
)
