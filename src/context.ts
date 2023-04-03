import React from "react";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

export const TableContext = React.createContext<{head: string[], body: any[][], addRow: any, addResult: any}>(
    {
        head: [],
        body: [],
        addRow: () => { },
        addResult: () => { },
    }
)

export const createTableContext = () => {
    
}
