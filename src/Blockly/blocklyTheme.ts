import { Theme } from '@mui/material';
import Blockly from 'blockly/core';

Blockly.registry.unregister('theme', 'dark');
Blockly.registry.unregister('theme', 'light');

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
        'toolboxBackgroundColour': '#797979',
        'flyoutBackgroundColour': '#797979',
        'flyoutOpacity': 0.9,
        'scrollbarColour': '#797979',
        'scrollbarOpacity': 0.4,
    },
    name: 'light'
});