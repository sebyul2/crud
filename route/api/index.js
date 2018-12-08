const userController = require('../../controller/user-controller')
const customerController = require('../../controller/customer-controller')
const noteController = require('../../controller/note-controller')

// api
//===================  user  ========================
app.put('/user', wrap(userController.createUser))

app.get('/user', wrap(userController.getUser))

app.post('/user', wrap(userController.updateUser))

app.delete('/user', wrap(userController.deleteUser))

//=================  customer  ======================
app.put('/customer', wrap(createCustomer))

app.get('/customer', wrap(getCustomer))

app.post('/customer', wrap(updateCustomer))

app.delete('/customer', wrap(deleteCustomer))

//=================  note  =========================
app.put('/note', wrap(createNote))

app.get('/note', wrap(getNote))

app.post('/note', wrap(updateNote))

app.delete('/note', wrap(deleteNote))

//모두 삭제
app.delete('/note/all', wrap(deleteAllNote))

//테스트용
// app.use('/', wrap(async (req, res) => {
//     res.send('hello world')
// }))