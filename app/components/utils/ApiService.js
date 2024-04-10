export async function getTasks(apiKey, userId, offset, limit ) {
    let url = 'https://redmine.codedot.io/issues.json'
    apiKey = `?key=${apiKey}`
    limit = limit ? `&limit=${limit}` : ''
    userId = userId ? `&assigned_to_id=${userId}` : ''
    offset = offset ? `&offset=${offset}` : ''
    return await fetch(`${url}${apiKey}${offset}${limit}${userId}`, {})
    .then((res) => res.json())
}
