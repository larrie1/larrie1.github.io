import { strings } from "../../Res/localization"

export const lv1_data = () => {
    const result = strings.result
    const lv1Decision = strings.lv1Decision
    const bad_weather = strings.bad_weather
    const good_weather = strings.good_weather
    const hot = strings.hot
    const windy = strings.windy
    const rainy = strings.rainy

    return [
        { [result]: undefined, [lv1Decision]: bad_weather, [hot]: true, [windy]: true, [rainy]: true },
        { [result]: undefined, [lv1Decision]: good_weather, [hot]: true, [windy]: false, [rainy]: false },
        { [result]: undefined, [lv1Decision]: good_weather, [hot]: true, [windy]: true, [rainy]: false },
        { [result]: undefined, [lv1Decision]: good_weather, [hot]: true, [windy]: true, [rainy]: false },
        { [result]: undefined, [lv1Decision]: bad_weather, [hot]: true, [windy]: false, [rainy]: true },
        { [result]: undefined, [lv1Decision]: bad_weather, [hot]: false, [windy]: false, [rainy]: false },
        { [result]: undefined, [lv1Decision]: bad_weather, [hot]: false, [windy]: true, [rainy]: false },
        { [result]: undefined, [lv1Decision]: bad_weather, [hot]: false, [windy]: false, [rainy]: false },
    ]
}

export const lv2_data = () => {
    const result = strings.result
    const lv2Decision = strings.lv2Decision
    const outlook = strings.outlook
    const temperature = strings.temperature
    const humidity = strings.humidity
    const no = strings.no
    const yes = strings.yes
    const sunny = strings.sunny
    const overcast = strings.overcast
    const mild = strings.mild
    const cool = strings.cool
    const high = strings.high
    const normal = strings.normal
    const windy = strings.windy
    const rainy = strings.rainy
    const hot = strings.hot

    return [
        { [result]: undefined, [lv2Decision]: no, [outlook]: sunny, [temperature]: hot, [humidity]: high, [windy]: false },
        { [result]: undefined, [lv2Decision]: no, [outlook]: sunny, [temperature]: hot, [humidity]: high, [windy]: true },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: overcast, [temperature]: hot, [humidity]: high, [windy]: false },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: rainy, [temperature]: mild, [humidity]: high, [windy]: false },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: rainy, [temperature]: cool, [humidity]: normal, [windy]: false },
        { [result]: undefined, [lv2Decision]: no, [outlook]: rainy, [temperature]: cool, [humidity]: normal, [windy]: true },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: overcast, [temperature]: cool, [humidity]: normal, [windy]: true },
        { [result]: undefined, [lv2Decision]: no, [outlook]: sunny, [temperature]: mild, [humidity]: high, [windy]: false },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: sunny, [temperature]: cool, [humidity]: normal, [windy]: false },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: rainy, [temperature]: mild, [humidity]: normal, [windy]: false },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: sunny, [temperature]: mild, [humidity]: normal, [windy]: true },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: overcast, [temperature]: mild, [humidity]: high, [windy]: true },
        { [result]: undefined, [lv2Decision]: yes, [outlook]: overcast, [temperature]: hot, [humidity]: normal, [windy]: false },
        { [result]: undefined, [lv2Decision]: no, [outlook]: rainy, [temperature]: mild, [humidity]: high, [windy]: true },
    ]
}
