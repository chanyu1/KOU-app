const passport = require('passport');
const { auth } = require('../middlewares/auth');
const { User } = require('../models/User');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/photos');
    },
  );

  app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).json({ success: true });
    });
  });

  app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 DB에서 찾는다
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: 'No such user exists!',
        });
      }
      // 요청된 이메일이 DB에 있다면 비밀번호 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: 'The password is incorrect!',
          });
        }
        // 비밀번호가 맞으면 토큰 생성
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          // 토큰 저장(쿠키, 로컬스토리지 등)
          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    });
  });

  app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어(auth)를 통과해 왔다는 얘기는 Authentication이 True라는 뜻
    res.status(200).json({
      _id: req.user._id,
      // 0은 일반유저, 그 외는 관리자
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  });

  app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({ success: true });
    });
  });

  app.get('/api/logout', (req, res) => {
    // console.log('logout', req);
    req.logout();
    res.redirect('/');
  });
};
