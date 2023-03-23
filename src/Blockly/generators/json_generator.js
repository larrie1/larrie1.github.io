import Blockly from 'blockly';

export const jsonGenerator = new Blockly.Generator('JSON');

jsonGenerator.PRECEDENCE = 0;

jsonGenerator['logic_null'] = function (block) {
  return ['null', jsonGenerator.PRECEDENCE];
};

jsonGenerator['text'] = function (block) {
  const textValue = block.getFieldValue('TEXT');
  const code = `"${textValue}"`;
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['math_number'] = function (block) {
  const code = String(block.getFieldValue('NUM'));
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['logic_boolean'] = function (block) {
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['stamm'] = function (block) {
  const values = [
    jsonGenerator.valueToCode(block, 'top', jsonGenerator.PRECEDENCE) || null,
    jsonGenerator.valueToCode(block, 'bottom', jsonGenerator.PRECEDENCE) || null,
  ]
  const valueString = '"Top": ' + values[0] + ',\n"Bottom": ' + values[1];
  const indentedValueString = jsonGenerator.prefixLines(valueString, jsonGenerator.INDENT);
  const code = '{\n' + indentedValueString + '\n}';
  return code;
};

jsonGenerator['knoten'] = function (block) {
  var dropdown_name = block.getFieldValue('dropdown');
  const values = [
    jsonGenerator.valueToCode(block, 'top', jsonGenerator.PRECEDENCE) || null,
    jsonGenerator.valueToCode(block, 'bottom', jsonGenerator.PRECEDENCE) || null,
  ]
  const valueString = '"Top": ' + values[0] + ',\n"Decision": ' + dropdown_name + ',\n"Bottom": ' + values[1];
  const indentedValueString = jsonGenerator.prefixLines(valueString, jsonGenerator.INDENT);
  const code = '{\n' + indentedValueString + '\n}';
  return [code, jsonGenerator.PRECEDENCE];
};

jsonGenerator['node'] = function (block) {
  var dropdown_name = block.getFieldValue('Decision');
  const values = [
    jsonGenerator.valueToCode(block, 'top', jsonGenerator.PRECEDENCE) || null,
    jsonGenerator.valueToCode(block, 'bottom', jsonGenerator.PRECEDENCE) || null,
  ]
  const valueString = '"Top": ' + values[0] + ',\n"Decision": ' + `"${dropdown_name}"` + ',\n"Bottom": ' + values[1];
  const indentedValueString = jsonGenerator.prefixLines(valueString, jsonGenerator.INDENT);
  const code = '{\n' + indentedValueString + '\n}';
  return [code, jsonGenerator.PRECEDENCE];
};
