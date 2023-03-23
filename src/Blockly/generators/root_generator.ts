import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';

javascriptGenerator['stamm'] = function (block: Blockly.Block) {
    javascriptGenerator.PRECEDENCE = 0
    const values = [
        javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.PRECEDENCE) || null,
        javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.PRECEDENCE) || null,
    ]
    const json = {
        Top: values[0],
        Bottom: values[1]
    }
    return JSON.stringify(json);
};