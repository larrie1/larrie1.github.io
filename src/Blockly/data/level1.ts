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
    ['Ergebnis', 'Wie ist das Wetter', 'Warm', 'Windig', 'Regen'],
    [
        [undefined, 'Schlechtes Wetter', true, true, true],
        [undefined, 'Gutes Wetter', true, false, false],
        [undefined, 'Gutes Wetter', true, true, false],
        [undefined, 'Gutes Wetter', true, true, false],
        [undefined, 'Schlechtes Wetter', true, false, true],
        [undefined, 'Schlechtes Wetter', false, false, false],
        [undefined, 'Schlechtes Wetter', false, true, false],
        [undefined, 'Schlechtes Wetter', false, false, false],
    ]
]

export const level2Table: [string[], any[][]] = [
    ['Result', 'Play Tennis', 'Outlook', 'Temperature', 'Humidity', 'Windy'],
    [
        [undefined, 'No', 'Sunny', 'Hot', 'High', false],
        [undefined, 'No', 'Sunny', 'Hot', 'High', true],
        [undefined, 'Yes', 'Overcast', 'Hot', 'High', false],
        [undefined, 'Yes', 'Rainy', 'Mild', 'High', false],
        [undefined, 'Yes', 'Rainy', 'Cool', 'Normal', false],
        [undefined, 'No', 'Rainy', 'Cool', 'Normal', true],
        [undefined, 'Yes', 'Overcast', 'Cool', 'Normal', true],
        [undefined, 'No', 'Sunny', 'Mild', 'High', false],
        [undefined, 'Yes', 'Sunny', 'Cool', 'Normal', false],
        [undefined, 'Yes', 'Rainy', 'Mild', 'Normal', false],
        [undefined, 'Yes', 'Sunny', 'Mild', 'Normal', true],
        [undefined, 'Yes', 'Overcast', 'Mild', 'High', true],
        [undefined, 'Yes', 'Overcast', 'Hot', 'Normal', false],
        [undefined, 'No', 'Rainy', 'Mild', 'High', true],
    ]
]