import { faker } from '@faker-js/faker';

faker.locale = 'zh_CN';

export const getFakerData = () => {
  const data = {
    name: faker.animal.cat(),
    content: faker.lorem.paragraphs(2),
    isShow: faker.datatype.boolean(),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
  };
  return data;
};
