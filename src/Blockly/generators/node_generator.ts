import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';

javascriptGenerator['knoten'] = function (block: Blockly.Block) {
    var dropdown_name = block.getFieldValue('dropdown');
    const values = [
        javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.PRECEDENCE) || null,
        javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.PRECEDENCE) || null,
    ]
    const json = {
        Top: values[0],
        Decision: dropdown_name,
        Bottom: values[1],
    }
    return [JSON.stringify(json), javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['node'] = function (block: Blockly.Block) {
    javascriptGenerator.PRECEDENCE = 0;
    var dropdown_name = block.getFieldValue('Decision');
    const values = [
        javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.PRECEDENCE) || null,
        javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.PRECEDENCE) || null,
    ]
    const json = {
        Top: values[0],
        Decision: dropdown_name,
        Bottom: values[1],
    }
    return [JSON.stringify(json), javascriptGenerator.PRECEDENCE];
};
