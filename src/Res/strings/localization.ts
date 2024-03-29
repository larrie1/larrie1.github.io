import LocalizedStrings from 'react-localization'
import { de } from './de'
import { en } from './en'

/**
 *  Object which assigns the correct language to the requested String. 
 *  Module: https://github.com/stefalda/react-localization
 */
export const localizedStrings = new LocalizedStrings({
    de,
    en
})