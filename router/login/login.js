const { findOne, findOneAndUpdate } = require('../../dao/UserServer');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../../utils/token');

module.exports = async (req, res) => {

  const { username, password } = req.body;
  const row = await findOne({ username: username });
  if (!row) return res.status(400).json({ message: '该用户不存在！', status: 400 });
  let compareResult = bcryptjs.compareSync(password, row.password);
  if (compareResult) {
    const token = createToken({ ...username });
    res.json({
      message: '登录成功',
      status: 200,
      token,
      id: row._id
    })
  } else {
    res.status(400).json({
      message: '密码错误！',
      status: 400
    })
  }
}