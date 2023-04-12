import React from "react";

export const userPrefsContext = React.createContext({ toggleColorMode: () => { }, toggleLocale: () => { } })

export const StepperContext = React.createContext({
    activeStep: 0,
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
