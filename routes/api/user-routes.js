const router = require('express').Router();

const user =require('../../controllers/user-controllers')
router.route('/').post(user.createUser).get(user.findUsers);
router.route('/:Id').get(user.findOne).delete(user.removeUser).put(user.updateUser);

router.route('/:userId/friends/:friendId').post(user.addFriend).delete(user.removeFriend)

module.exports=router;