export const training_data = [
    { "Wie ist das Wetter": false, "Warm": true, "Windig": true, "Regen": true },
    { "Wie ist das Wetter": true, "Warm": true, "Windig": false, "Regen": false },
    { "Wie ist das Wetter": true, "Warm": true, "Windig": true, "Regen": false },
    { "Wie ist das Wetter": true, "Warm": true, "Windig": true, "Regen": false },
    { "Wie ist das Wetter": false, "Warm": true, "Windig": false, "Regen": true },
    { "Wie ist das Wetter": false, "Warm": false, "Windig": false, "Regen": false },
    { "Wie ist das Wetter": false, "Warm": false, "Windig": true, "Regen": false },
    { "Wie ist das Wetter": false, "Warm": false, "Windig": false, "Regen": false }
]

export const level1Table: [string[], any[][]] = [
    ['Wie ist das Wetter', 'Warm', 'Windig', 'Regen'],
    [
        ['Schlechtes Wetter', true, true, true],
        ['Gutes Wetter', true, false, false],
        ['Gutes Wetter', true, true, false],
        ['Gutes Wetter', true, true, false],
        ['Schlechtes Wetter', true, false, true],
        ['Schlechtes Wetter', false, false, false],
        ['Schlechtes Wetter', false, true, false],
        ['Schlechtes Wetter', false, false, false],
    ]
]

export const level2Table: [string[], any[][]] = [
    ['Play Tennis', 'Outlook', 'Temperature', 'Humidity', 'Windy'],
    [
        ['No', 'Sunny', 'Hot', 'High', false],
        ['No', 'Sunny', 'Hot', 'High', true],
        ['Yes', 'Overcast', 'Hot', 'High', false],
        ['Yes', 'Rainy', 'Mild', 'High', false],
        ['Yes', 'Rainy', 'Cool', 'Normal', false],
        ['No', 'Rainy', 'Cool', 'Normal', true],
        ['Yes', 'Overcast', 'Cool', 'Normal', true],
        ['No', 'Sunny', 'Mild', 'High', false],
        ['Yes', 'Sunny', 'Cool', 'Normal', false],
        ['Yes', 'Rainy', 'Mild', 'Normal', false],
        ['Yes', 'Sunny', 'Mild', 'Normal', true],
        ['Yes', 'Overcast', 'Mild', 'High', true],
        ['Yes', 'Overcast', 'Hot', 'Normal', false],
        ['No', 'Rainy', 'Mild', 'High', true],
    ]
]