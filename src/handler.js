const {nanoid} = require('nanoid')
const notes = require('./notes')

//ini untuk menambahkan notesnya
const addNoteHandler = (request, h) => {
    //cara mendapatkan body req di hapi = req.payload
    const { title, tags, body } = request.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }
    //mengirimkan ke dalam array note
    notes.push(newNote)

    //ini untuk filter apakah newnte sudah masuk ke aaray pakai id nya
    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if(isSuccess){
        const response = h.response({
            status : 'succcess',
            message : 'Catatan berhasil ditambahkan',
            data : {
                noteId : id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal ditambahkan'
    })
    // response.code(500)
    // return response

}

//ini untuk menampilkan all notesnya
const getAllNotesHandler = () => ({
    status : 'success',
    data : {
        notes,
    }
})

//untuk menampilkan berdasarkan id
getNoteByIdHandler = (request, h) => {
    const {id} = request.params

    //mengambil dengan array filter
    const note = notes.filter((n) => n.id === id)[0] 
    if(note !== undefined){
        return {
            status : 'success',
            data : {
                note,
            }
        }
    }

    const response = h.response ({
        status : 'fail',
        message : 'Catatan tidak ditemukan'
    })
    response.code(404)
    return response
}

//untuk edit notes sesuai id nya
const editNoteByIdHandler = (request, h) => {
    const {id} = request.params

    const {title, tags, body} = request.payload
    const updatedAt = new Date().toISOString()

    //untuk mendapatkan index array, bila ditemukan akan bernilai. bila tidak bernilai -1
    const index = notes.findIndex((note) => note.id === id)
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }

        const response = h.response({
            status : 'success',
            message : 'Catatan berhasil diperbarui'
        })
        response.code(200)
        return response

    }

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbarui catatan. Id tidak ditemukan '
    })
    response.code(404)
    return response
}

//ini untuk menghapus notes
const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params

    const index = notes.findIndex((note) => note.id === id)
    if(index !== -1){
        notes.splice(index, 1)
        const response = h.response({
            status : 'success',
            message : 'Catatan berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal dihapus. Id tidak ditemukan '
    })
    response.code(404)
    return response
}

module.exports = {
    addNoteHandler ,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
}