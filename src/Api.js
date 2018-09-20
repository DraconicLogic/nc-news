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



export const getArticles = () => {
   return fetch(`${DB_URL}/articles`)
    .then(buffer => buffer.json())
}

export const getArticleByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}`)
    .then(buffer => buffer.json())
}

export const getCommentsByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}/comments`)
    .then(buffer => buffer.json())
}

export const castVote = (id, direction, url) => {
    return fetch(`${DB_URL}/${url}/${id}?vote=${direction}`, {method: 'PUT'})
    .then((buffer) => {
        console.log(buffer,'WHAT IS THIS??')
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
    // return fetch(`${DB_URL}/comments/${id}`)
    // .then(buffer => buffer.json())
    const url = `${DB_URL}/comments/${id}`

    return deleteData(url)

}