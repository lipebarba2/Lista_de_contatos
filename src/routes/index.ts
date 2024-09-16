import { error } from 'console'
import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { createContact, deleteContact, getContacts } from '../services/contact'

const dataSource = './data/list.txt'

const router = express.Router()

router.post('/contato', async (req, res) => {
    const { name } = req.body

    if(!name || name.length < 2){
        return res.json({error: "Nome precisa ter pelo menos 2 caracterers"})
    }

    //processamento dos dados
    await createContact(name)

    res.status(201).json({ contato: name})
})

router.get('/contatos' , async (req, res) => {
    let list = await getContacts()

    res.json({ contatos: list })
})

router.delete('/contato', async (req, res) => {
    const { name } = req.query

    if(!name) {
        return res.json({ error: ' Precisa enviar um nome'})
    }

    await deleteContact(name as string)
    res.json({ contato: name })


})


export default router