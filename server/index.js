const app = require('express')();
const fs = require('fs');

app.get('/media/List', (req, res) => {
  // 获取当前目录下的所有文件和文件夹
  fs.readdir('./static/media', (err, files) => {
    if (err) {
      console.log('无法读取目录:', err);
      return;
    }
    // 筛选出所有以.mp4结尾的文件
    const mp4Files = files.filter(file => file.endsWith('.mp4'));

    const list = []
    // 输出mp4文件的名称
    mp4Files.forEach(file => {
      list.push({
        name: file
      })
    });
    res.send(list)
  });
})

module.exports = {
  path: 'api',
  handler: app
}
