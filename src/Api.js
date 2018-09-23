const DB_URL = 'https://draconiclogic-nc-news.herokuapp.com/api'


function postData(url, data) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
        redirect: "follow", 
        referrer: "no-referrer",
        body: JSON.stringify(data)
    })
    .then((response) => {
   return response.json()})
}

function deleteData(url) {
    return fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
        redirect: "follow", 
        referrer: "no-referrer",
    })
    .then((response) => {
   return response.json()})
}

const withErrorHandling = (func) => {
    return function (...args) {
        return func(...args).catch(err => ({err}))
    }
}



export const getArticles = () => {
   return fetch(`${DB_URL}/articles`)
    .then(buffer => buffer.json())
}

export const getArticleByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}`)
    .then((buffer) => {
        console.log(buffer)
        console.log(buffer.status)
        if (buffer.status !== 200) {
            throw { status: buffer.status, msg: buffer.statusText }
        } else {
        return buffer.json()
    }
    })
    // .catch((error) => {
    //     console.log(error)
    //     return error
    // })
}

export const getCommentsByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}/comments`)
    .then(buffer => buffer.json())
}

export const castVote = (id, direction, url) => {
    return fetch(`${DB_URL}/${url}/${id}?vote=${direction}`, {method: 'PUT'})
    .then((buffer) => {
        buffer.json()})

}
export const getTopics = () => {
    return fetch(`${DB_URL}/topics`)
    .then(buffer => buffer.json())
}
export const postComment = ({body, belongs_to, created_by}) => {
    const url = `${DB_URL}/articles/${belongs_to}/comments`
    const data = {body, created_by, belongs_to}

     return postData(url, data)
    
}
export const getArticleByTopic = (slug) => {
    return fetch(`${DB_URL}/topics/${slug}/articles`)
    .then(buffer => buffer.json())
}
export const getUserByID = (id) => {
    return fetch(`${DB_URL}/users/${id}`)
    .then(buffer => buffer.json())
}
export const deleteComment = (id) => { 
    const url = `${DB_URL}/comments/${id}`

    return deleteData(url)

}