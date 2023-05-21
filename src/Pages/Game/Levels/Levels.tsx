import { lv1_data, localizedStrings, lv2_data, lv3_data, lv4_data, lv5_data } from '../../../Res';
import { Level } from './Level';

localStorage.setItem("level3blocks", '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"><field name="DECISION">Hat es Federn?</field><field name="CHOICE0">Nein</field><field name="CHOICE1">Ja</field><value name="0"><block type="node"><field name="DECISION">Lebt es unter der Erde?</field><field name="CHOICE0">Ja</field><field name="CHOICE1">Nein</field><value name="0"></value><value name="1"></value></block></value><value name="1"><block type="node"><field name="DECISION">Kann es Fliegen?</field><field name="CHOICE0">Nein</field><field name="CHOICE1">Ja</field><value name="0"></value><value name="1"></value></block></value></block></xml>')

export const getLevel = (index: number, unlocked: boolean) => [
    <Level
        xmlKey={"level1blocks"}
        data={lv1_data()}
        title='Level 1'
        description={localizedStrings.level1_description}
        isUnlocked={true}
        task={localizedStrings.level1_task}
        intro={localizedStrings.level1_intro} />,
    <Level
        xmlKey={"level2blocks"}
        data={lv2_data()}
        title='Level 2'
        description={localizedStrings.level2_description}
        isUnlocked={unlocked}
        task={localizedStrings.level2_task}
        intro={localizedStrings.level2_intro} />,
    <Level
        xmlKey={"level3blocks"}
        data={lv3_data()}
        title='Level 3'
        description={localizedStrings.level3_description}
        isUnlocked={unlocked}
        task={localizedStrings.level3_task}
        intro={localizedStrings.level3_intro} />,
    <Level
        xmlKey={"level4blocks"}
        data={lv4_data()}
        title='Level 4'
        description={localizedStrings.level4_description}
        isUnlocked={unlocked}
        task={localizedStrings.level4_task}
        intro={localizedStrings.level4_intro} />,
    <Level
        xmlKey={"level5blocks"}
        data={lv5_data()}
        title='Level 5'
        description={localizedStrings.level5_description}
        isUnlocked={unlocked}
        task={localizedStrings.level5_task}
        intro={localizedStrings.level5_intro} />
].at(index)

export default getLevel
