import { localizedStrings } from ".."

/**
 *  This Method creates the JSON representation of the first Level.
 * 
 *  @returns Data for Level 1
 */
export const lv1_data = () => {
    const result = localizedStrings.result
    const decision = localizedStrings.level1_decision
    const car = localizedStrings.car
    const motorcycle = localizedStrings.motorcycle
    const tires = localizedStrings.tires

    return {
        target: decision, features: [tires], data: [
            { [result]: undefined, [decision]: car, [tires]: 4 },
            { [result]: undefined, [decision]: motorcycle, [tires]: 2 },
        ]
    }
}

/**
 *  This Method creates the JSON representation of the second Level.
 * 
 *  @returns Data for Level 2
 */
export const lv2_data = () => {
    const result = localizedStrings.result
    const decision = localizedStrings.level2_decision
    const fruit = localizedStrings.fruit
    const vegetable = localizedStrings.vegetables
    const sour = localizedStrings.sour
    const sweet = localizedStrings.sweet
    const bitter = localizedStrings.bitter
    const salty = localizedStrings.salty
    const taste = localizedStrings.taste

    return {
        target: decision, features: [taste], data: [
            { [result]: undefined, [decision]: fruit, [taste]: sour },
            { [result]: undefined, [decision]: vegetable, [taste]: bitter },
            { [result]: undefined, [decision]: vegetable, [taste]: salty },
            { [result]: undefined, [decision]: fruit, [taste]: sweet },
        ]
    }
}

/**
 *  This Method creates the JSON representation of the third Level.
 * 
 *  @returns Data for Level 3
 */
export const lv3_data = () => {
    const result = localizedStrings.result
    const decision = localizedStrings.level3_decision
    const feathers = localizedStrings.feathers
    const fly = localizedStrings.fly
    const ground = localizedStrings.ground
    const mole = localizedStrings.mole
    const dog = localizedStrings.dog
    const penguin = localizedStrings.penguin
    const crow = localizedStrings.crow
    const yes = localizedStrings.yes
    const no = localizedStrings.no

    return {
        target: decision, features: [feathers, fly, ground], data: [
            { [result]: undefined, [decision]: mole, [feathers]: no, [fly]: no, [ground]: yes },
            { [result]: undefined, [decision]: dog, [feathers]: no, [fly]: no, [ground]: no },
            { [result]: undefined, [decision]: penguin, [feathers]: yes, [fly]: no, [ground]: no },
            { [result]: undefined, [decision]: crow, [feathers]: yes, [fly]: yes, [ground]: no },
        ]
    }
}

/**
 *  This Method creates the JSON representation of the fourth Level.
 * 
 *  @returns Data for Level 4
 */
export const lv4_data = () => {
    const result = localizedStrings.result
    const lv2Decision = localizedStrings.level4_decision
    const bad_weather = localizedStrings.bad_weather
    const good_weather = localizedStrings.good_weather
    const hot = localizedStrings.hot
    const windy = localizedStrings.windy
    const rainy = localizedStrings.rainy

    return {
        target: lv2Decision, features: [hot, windy, rainy], data: [
            { [result]: undefined, [lv2Decision]: bad_weather, [hot]: true, [windy]: true, [rainy]: true },
            { [result]: undefined, [lv2Decision]: good_weather, [hot]: true, [windy]: false, [rainy]: false },
            { [result]: undefined, [lv2Decision]: good_weather, [hot]: true, [windy]: true, [rainy]: false },
            { [result]: undefined, [lv2Decision]: good_weather, [hot]: true, [windy]: true, [rainy]: false },
            { [result]: undefined, [lv2Decision]: bad_weather, [hot]: true, [windy]: false, [rainy]: true },
            { [result]: undefined, [lv2Decision]: bad_weather, [hot]: false, [windy]: false, [rainy]: false },
            { [result]: undefined, [lv2Decision]: bad_weather, [hot]: false, [windy]: true, [rainy]: false },
            { [result]: undefined, [lv2Decision]: bad_weather, [hot]: false, [windy]: false, [rainy]: false },
        ]
    }
}

/**
 *  This Method creates the JSON representation of the fifth Level.
 * 
 *  @returns Data for Level 5
 */
export const lv5_data = () => {
    const result = localizedStrings.result
    const lv3Decision = localizedStrings.level5_decision
    const outlook = localizedStrings.outlook
    const temperature = localizedStrings.temperature
    const humidity = localizedStrings.humidity
    const no = localizedStrings.no
    const yes = localizedStrings.yes
    const sunny = localizedStrings.sunny
    const overcast = localizedStrings.overcast
    const mild = localizedStrings.mild
    const cool = localizedStrings.cool
    const high = localizedStrings.high
    const normal = localizedStrings.normal
    const windy = localizedStrings.windy
    const rainy = localizedStrings.rainy
    const hot = localizedStrings.hot

    return {
        target: lv3Decision, features: [outlook, temperature, humidity, windy], data: [
            { [result]: undefined, [lv3Decision]: no, [outlook]: sunny, [temperature]: hot, [humidity]: high, [windy]: false },
            { [result]: undefined, [lv3Decision]: no, [outlook]: sunny, [temperature]: hot, [humidity]: high, [windy]: true },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: overcast, [temperature]: hot, [humidity]: high, [windy]: false },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: rainy, [temperature]: mild, [humidity]: high, [windy]: false },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: rainy, [temperature]: cool, [humidity]: normal, [windy]: false },
            { [result]: undefined, [lv3Decision]: no, [outlook]: rainy, [temperature]: cool, [humidity]: normal, [windy]: true },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: overcast, [temperature]: cool, [humidity]: normal, [windy]: true },
            { [result]: undefined, [lv3Decision]: no, [outlook]: sunny, [temperature]: mild, [humidity]: high, [windy]: false },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: sunny, [temperature]: cool, [humidity]: normal, [windy]: false },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: rainy, [temperature]: mild, [humidity]: normal, [windy]: false },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: sunny, [temperature]: mild, [humidity]: normal, [windy]: true },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: overcast, [temperature]: mild, [humidity]: high, [windy]: true },
            { [result]: undefined, [lv3Decision]: yes, [outlook]: overcast, [temperature]: hot, [humidity]: normal, [windy]: false },
            { [result]: undefined, [lv3Decision]: no, [outlook]: rainy, [temperature]: mild, [humidity]: high, [windy]: true },
        ]
    }
}
