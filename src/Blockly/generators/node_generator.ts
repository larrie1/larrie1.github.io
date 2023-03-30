import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript';

javascriptGenerator.PRECEDENCE = 0;

javascriptGenerator['node'] = function (block: Blockly.Block) {
    var decision = block.getFieldValue('DECISION');
    const values = []
    const dropDowns = []
    let counter = 0
    let nextBlock = javascriptGenerator.valueToCode(block, counter.toString(), javascriptGenerator.PRECEDENCE) || null
    let nextDropDown = block.getFieldValue('CHOICE' + counter);
    while (nextDropDown) {
        dropDowns.push(nextDropDown)
        values.push(nextBlock)
        counter++
        nextDropDown = block.getFieldValue('CHOICE' + counter);
        nextBlock = javascriptGenerator.valueToCode(block, counter.toString(), javascriptGenerator.PRECEDENCE) || null
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
    return [str, javascriptGenerator.PRECEDENCE];
};
