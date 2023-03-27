import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';

/*javascriptGenerator['node'] = function (block: Blockly.Block) {
    javascriptGenerator.PRECEDENCE = 0;
    var dropdown_name = block.getFieldValue('Decision');
    const values = [
        javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.PRECEDENCE) || null,
        javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.PRECEDENCE) || null,
    ]
    const json = {
        Top: values[0],
        Decision: `"${dropdown_name}"`,
        Bottom: values[1],
    }
    return ['{"top": ' + json.Top + ', "decision": ' + json.Decision + ', "bottom": ' + json.Bottom + "}", javascriptGenerator.PRECEDENCE];
};*/

javascriptGenerator['node'] = function(block: Blockly.Block) {
    javascriptGenerator.PRECEDENCE = 0;
    const values = [
        javascriptGenerator.valueToCode(block, '1', javascriptGenerator.PRECEDENCE) || null,
        javascriptGenerator.valueToCode(block, '2', javascriptGenerator.PRECEDENCE) || null,
    ]
    var decision = block.getFieldValue('DECISION') as string;
    var choice1 = block.getFieldValue('CHOICE1') as string;
    var choice2 = block.getFieldValue('CHOICE2') as string;
    var code = '{"decision": ' + `"${decision}"` + ', ' + `"${choice1}"` + ': ' + values[0] + ', ' + `"${choice2}"` + ': ' + values[1] + '}'
    return [code, javascriptGenerator.PRECEDENCE];
  };
