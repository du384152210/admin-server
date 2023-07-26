
const { User } = require('../../model/User');
const { varifyToken } = require('../../utils/token')

module.exports = async (req, res) => {
  let token = req.headers.authorization;
  let username = '';
  try {
    const res = await varifyToken(token);
    for(let key in res.decoded) {
      if(!isNaN(Number(key))) {
        username += res.decoded[key]
      }
    }
  } catch (error) {
    res.status(500).josn({
      message: error
    })
  }
  
  const row = await User.findOne({ username }).select('-password').select('-gender')
  res.status(200).json({
    msg: 'success',
    data: row
  });
}