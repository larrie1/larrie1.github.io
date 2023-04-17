import Blockly from 'blockly';

export const jsonGenerator: any = new Blockly.Generator('JSON');

jsonGenerator.PRECEDENCE = 0;

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
