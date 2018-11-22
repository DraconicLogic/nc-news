const DB_URL = 'https://draconiclogic-nc-news.herokuapp.com/api';

const postData = (url, data) => {
    return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        })
        .then((buffer) => {
            return buffer.json();
        });
};

const deleteData = (url) => {
    return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((buffer) => {
            return buffer.json()
        })
}

const errorHandling = (buffer) => {
    if (buffer.status !== 200 && buffer.status !== 201) {
        // eslint-disable-next-line
        throw {
            status: buffer.status,
            msg: buffer.statusText
        }
    } 
    return buffer
    
}

export const getArticles = () => {
    return fetch(`${DB_URL}/articles`)
        .then((buffer) => {
            errorHandling(buffer)
            return buffer.json()
        })
}

export const getArticleByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}`)
        .then((buffer) => {
            errorHandling(buffer)
            return buffer.json()
            
        }).then(({
            article
        }) => article)
}

export const getCommentsByID = (id) => {
    return fetch(`${DB_URL}/articles/${id}/comments`)
        .then((buffer) => {           
            return buffer.json()
        })
}

export const castVote = (id, direction, url) => {
    return fetch(`${DB_URL}/${url}/${id}?vote=${direction}`, {
            method: 'PUT'
        })
        .then((buffer) => {
            buffer.json()
        })

}

export const getTopics = () => {
    return fetch(`${DB_URL}/topics`)
        .then((buffer) => {
            errorHandling(buffer)
            return buffer.json()
        })
}

export const postArticle = ({
    title,
    body,
    created_by,
    belongs_to
}) => {
    const url = `${DB_URL}/topics/${belongs_to}/articles`
    const data = {
        title,
        body,
        created_by,
        belongs_to
    }
    return postData(url, data)
}

export const postComment = ({
    body,
    belongs_to,
    created_by
}) => {
    const url = `${DB_URL}/articles/${belongs_to}/comments`
    const data = {
        body,
        created_by,
        belongs_to
    }

    return postData(url, data)
}

export const getArticleByTopic = (slug) => {
    return fetch(`${DB_URL}/topics/${slug}/articles`)
        .then(buffer => buffer.json())
}

export const getUserByID = (id) => {
    return fetch(`${DB_URL}/users/${id}`)
        .then((buffer) => {
            errorHandling(buffer)
            return buffer.json()
        })
}

export const deleteComment = (id) => {
    const url = `${DB_URL}/comments/${id}`

    return deleteData(url)
}

