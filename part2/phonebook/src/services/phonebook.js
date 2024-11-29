import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const update = (updatedEntry, id) => { return axios.put(`${baseUrl}/${id}`, updatedEntry).then(response => response.data) }

const create = (newEntry) => { return axios.post(`${baseUrl}`, newEntry).then(response => response.data) }

const deletePerson = (id) => { return axios.delete(`${baseUrl}/${id}`).then(response => response.data) }

export default {
    getAll,
    update,
    create,
    deletePerson
}