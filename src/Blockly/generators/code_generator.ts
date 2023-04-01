import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';

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
    var decision = block.getFieldValue('DECISION');
    const values = []
    const dropDowns = []
    let counter = 0
    let nextBlock = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    let nextDropDown = block.getFieldValue('CHOICE' + counter);
    while (nextDropDown) {
        dropDowns.push(nextDropDown)
        values.push(nextBlock)
        counter++
        nextDropDown = block.getFieldValue('CHOICE' + counter);
        nextBlock = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    }
    var childStr = ""
    for (let i = 0; i < dropDowns.length; i++) {
        if (i === dropDowns.length - 1) {
            childStr += `"${dropDowns[i]}"` + ': ' + values[i]
        } else {
            childStr += `"${dropDowns[i]}"` + ': ' + values[i] + ', '
        }
    }
    const str = '{"Decision": ' + `"${decision}"` + ', ' + childStr + '}'
    return [str, codeGenerator.PRECEDENCE];
};
