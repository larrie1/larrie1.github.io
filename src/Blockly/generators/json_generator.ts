import Blockly from 'blockly';
import { NODE_TYPES } from '../../ID3/decision-tree';

export const jsonGenerator: any = new Blockly.Generator('JSON');

jsonGenerator.PRECEDENCE = 0;

jsonGenerator['text'] = function (block: Blockly.Block) {
  const textValue = block.getFieldValue('TEXT');
  const code = `"${textValue}"`;
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['math_number'] = function (block: Blockly.Block) {
  const code = String(block.getFieldValue('NUM'));
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['logic_boolean'] = function (block: Blockly.Block) {
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['node'] = function (block: Blockly.Block) {
  var decision = block.getFieldValue('DECISION');
  const values = []
  const dropDowns = []
  let counter = 0
  let nextBlock = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
  let nextDropDown = block.getFieldValue('CHOICE' + counter);
  while (nextDropDown) {
    dropDowns.push(nextDropDown)
    values.push(nextBlock)
    counter++
    nextDropDown = block.getFieldValue('CHOICE' + counter);
    nextBlock = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
  }
  var childStr = ""
  for (let i = 0; i < dropDowns.length; i++) {
    if (i === dropDowns.length - 1) {
      childStr += `"${dropDowns[i]}"` + ': ' + values[i]
    } else {
      childStr += `"${dropDowns[i]}"` + ': ' + values[i] + ',\n'
    }
  }
  const str = '"Decision": ' + `"${decision}"` + ',\n' + childStr
  const indentedValueString = jsonGenerator.prefixLines(str, jsonGenerator.INDENT);
  const code = '{\n' + indentedValueString + '\n}';
  return [code, jsonGenerator.PRECEDENCE];
};
jsonGenerator['node'] = function (block: Blockly.Block) {
  var decision = block.getFieldValue('DECISION')
  let counter = 0
  let choice = block.getFieldValue('CHOICE' + counter)
  let value = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
  let json = ""

  while(choice) {
      counter++
      json += `"${choice}"` + ': ' + value + ',\n'
      choice = block.getFieldValue('CHOICE' + counter); 
      value = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
  }

  json = json.substring(0, json.length - 2)

  const str = '"value": ' + `"${decision}"` + ',\n' + json
  const indentedValueString = jsonGenerator.prefixLines(str, jsonGenerator.INDENT);
  const code = '{\n' + indentedValueString + '\n}';
  return [code, jsonGenerator.PRECEDENCE];
};
