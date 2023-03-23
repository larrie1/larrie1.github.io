Blockly.JavaScript['node'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_top = Blockly.JavaScript.valueToCode(block, 'top', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bottom = Blockly.JavaScript.valueToCode(block, 'bottom', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};