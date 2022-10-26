const multer = require('multer');
const multerS3 = require('multer-s3'); // multer-s3이 아닌 multer-s3-transform을 임포트
const sharp = require('sharp');
const s3 = require('../config/s3');

class S3ImageController {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'qportminiprojectmini', //버켓 이름
      acl: 'public-read', //접근 권한
      contentType: multerS3.AUTO_CONTENT_TYPE,
      shouldTransform: true,
      key: function (req, file, cb) {
        console.log(file);
        let ext = file.mimetype.split('/')[1]; // 확장자
        // 이미지만 처리
        if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext))
          return cb(new Error('이미지 파일이 아닙니다.'));

        cb(null, `post/${Date.now()}.${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10메가로 용량 제한
  });
}

module.exports = S3ImageController;
