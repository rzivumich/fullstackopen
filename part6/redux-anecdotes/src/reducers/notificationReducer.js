const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'REMOVE_NOTIFICATION':
        return initialState
      default:
        return initialState
    }
}

export const notificationChange = (notification) => {
    return {
      type: 'SET_NOTIFICATION',
      notification,
    }
}

export const notificationVoted = (notification) => {
    notification = 'you voted \'' + notification + '\''
    return {
        type: 'SET_NOTIFICATION',
        notification,
    }
}

export const notificationCreated = (notification) => {
    notification = 'you created \'' + notification + '\''
    return {
        type: 'SET_NOTIFICATION',
        notification,
    }
}

export const removeNotification = () =>{
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}

export default notificationReducer