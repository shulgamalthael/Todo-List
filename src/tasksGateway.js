const baseUrl = 'https://6050e6265346090017670bc0.mockapi.io/users_profiles';

export const createTask = taskData => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Faild to create task')
        }
    })
}

export const fetchTasksList = () => {
    return fetch(baseUrl).then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(tasksList => {
            return tasksList.map(({ _id, ...task }) => ({
                id: _id,
                ...task,
            }))
        })
}


export const updatedTask = (taskId, taskData) => {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Faild to create task')
        }
    });
}

export const deleteTask = taskId => {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Faild to create task')
        }
    })
}