import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default ({label, iconName}) => ({
    tapBarLabel: label,
    drawerIcon: ({tinColor}) => <MaterialIcons name={iconName} size={24} style={{color:tinColor}}/>
})