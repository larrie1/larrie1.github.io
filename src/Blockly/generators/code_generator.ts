import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';
import { NODE_TYPES } from '../../ID3/decision-tree';

export const codeGenerator: any = new Blockly.Generator('CODE');

codeGenerator.PRECEDENCE = 0;

codeGenerator['text'] = function (block: Blockly.Block) {
  const textValue = block.getFieldValue('TEXT');
  const code = `"${textValue}"`;
  return [code, codeGenerator.PRECEDENCE];
};

codeGenerator['math_number'] = function (block: Blockly.Block) {
  const code = String(block.getFieldValue('NUM'));
  return [code, codeGenerator.PRECEDENCE];
};

codeGenerator['logic_boolean'] = function (block: Blockly.Block) {
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, codeGenerator.PRECEDENCE];
};

codeGenerator['node'] = function (block: Blockly.Block) {
    var decision = block.getFieldValue('DECISION')
    let counter = 0
    let choice = block.getFieldValue('CHOICE' + counter)
    let value = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    let json = ""

    while(choice) {
        counter++
        json += `"${choice}"` + ': ' + value + ', '
        choice = block.getFieldValue('CHOICE' + counter); 
        value = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    }

    json += '"type": ' + `"${NODE_TYPES.LEAF}"`

    const str = '{"Decision": ' + `"${decision}"` + ', ' + '"type": ' + `"${NODE_TYPES.DECISION}"` + ', ' + json + '}'
    return [str, codeGenerator.PRECEDENCE];
};
