const os = require('os');
const ifaces = os.networkInterfaces();

export const getLocal = () => {
  // 遍历网络接口信息，找到局域网 IP 地址
  let localIp = '';
  Object.keys(ifaces).forEach(iface => {
    ifaces[iface].forEach(details => {
      if (details.family === 'IPv4' && !details.internal) {
        localIp = details.address;
      }
    });
  });
  return {
    ip: localIp,
    port: '3000'
  }
}
