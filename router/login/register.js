const { findOne, validateUser, createUser } = require('../../dao/UserServer');

module.exports = async(req, res) => {
  const { email } = req.body;
  try {
    await validateUser(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 400 });
  }

  const row = await findOne({email});
  if(row) return res.status(400).json({message: '该用户名已注册!', status: 400});
  
  else {
    try {
      const user = await createUser(req.body);
      res.status(200).json({
        message: '注册成功',
        status: 200
      })
    } catch (error) {
      res.status(500).send({message: error})
    }
  }
  
}