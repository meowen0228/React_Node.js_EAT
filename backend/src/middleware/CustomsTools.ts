export const CodeStatus = (code: number, mgs: string , data?: {}): {} => {
  const isoStr = new Date().toLocaleString('zh-tw', {
    timeZone: 'Asia/Taipei',
  });
  const result = {
    'code': code,
    'msg': mgs,
    'response_at': isoStr,
    'data': data,
  };
  return result;
};
