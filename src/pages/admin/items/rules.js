export const nameRules = [
  {
    required: true,
    message: '请输入 Item 名称',
  },
];

export const quantityRules = [
  {
    required: true,
    message: '请输入 Item 数量',
  },
  {
    validator: (rule, value) => {
      if (value < 0) {
        return Promise.reject('不能小于0');
      }
      if (Math.floor(value) !== value) {
        return Promise.reject('请输入整数');
      }
      return Promise.resolve();
    },
  },
];
