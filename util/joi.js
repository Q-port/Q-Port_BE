const Joi = require('joi');

module.exports = {
  signupSchema: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .error(new Error('이메일 형식이 올바르지 않습니다.')),
    nickname: Joi.string()
      .min(3)
      .alphanum()
      .required()
      .error(
        new Error(
          '닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성되어야 합니다.'
        )
      ),
    password: Joi.string()
      .min(4)
      .required()
      .error(new Error('비밀번호는 최소 4자 이상이어야 합니다.')),
    confirm: Joi.string()
      .min(4)
      .required()
      .error(new Error('비밀번호는 최소 4자 이상이어야 합니다.')),
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .min(3)
      .required()
      .error(new Error('이메일 또는 패스워드를 확인해주세요.')),
    password: Joi.string()
      .min(4)
      .required()
      .error(new Error('이메일 또는 패스워드를 확인해주세요.')),
  })
};
