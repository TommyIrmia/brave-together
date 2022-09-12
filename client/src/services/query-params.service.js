export const queryParamsService = {
    getFilterFromQueryParams,
    getQueryParamsFromFilter
}

//TODO : change function names!!!


function getFilterFromQueryParams(searchParams) {
    let queryParams = Object.fromEntries(searchParams)
    for (const key in queryParams) {
        if (queryParams[key] === 'null' || !queryParams[key]) {
            delete queryParams[key]
        }
        if (key === 'tags' && queryParams.tags?.length) {
            queryParams[key] = queryParams[key].split(',')
        }
    }
    return queryParams
}

function getQueryParamsFromFilter(filterToQuery) {
    for (let key in filterToQuery) {
        if (filterToQuery[key] === 'null' || !filterToQuery[key]) {
            delete filterToQuery[key]
        }
    }
    return filterToQuery
}