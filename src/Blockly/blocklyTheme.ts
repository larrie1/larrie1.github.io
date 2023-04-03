import Blockly from 'blockly/core';

export const darkTheme = Blockly.Theme.defineTheme('dark', {
    'base': Blockly.Themes.Zelos,
    'componentStyles': {
        'workspaceBackgroundColour': '#212529',
        'toolboxBackgroundColour': '#17191c',
        'flyoutBackgroundColour': '#17191c',
        'flyoutOpacity': 0.9,
        'scrollbarColour': '#4d5053',
        'scrollbarOpacity': 0.4,
    },
    name: 'dark'
});

export const lightTheme = Blockly.Theme.defineTheme('light', {
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#fff',
        'toolboxBackgroundColour': '#efecf4',
        'flyoutBackgroundColour': '#efecf4',
        'flyoutOpacity': 0.9,
        'scrollbarColour': '#797979',
        'scrollbarOpacity': 0.4,
    },
    name: 'light'
});