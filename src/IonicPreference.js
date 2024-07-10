import { Preferences } from '@capacitor/preferences'

const setNewPreference = async (key, value) => {
    await Preferences.set({
      key: key,
      value: value,
    });
}

const getPreference = async (key) => {
    const { value } = await Preferences.get({ key: key })
    return value
}

const removePreference = async (key) => {
    await Preferences.remove({ key: key })
}

const preferenceMethods = {
    set: setNewPreference, 
    get: getPreference,
    remove: removePreference
}

export default preferenceMethods