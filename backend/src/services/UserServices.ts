import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { ILogin } from '../type';
import CreateToken from '../middleware/CreateToken';

export const login = async (data: ILogin) => {
  console.log(data);
  const userResult = await AppDataSource.getRepository(User)
    .createQueryBuilder()
    .select(['user.userName', 'user.password', 'user.id'])
    .from(User, 'user')
    .where('user.userName = :userName', { userName: data.userName })
    .andWhere('user.password = :password', { password: data.password })
    .getOne();

  if (userResult[0] === 0) {
    let msg = 'account or pasword wrong';
    return msg;
  } else {
    const token = await CreateToken(data);
    const result = {
      id: userResult.id,
      token: token,
    };
    return result;
  }
};

export const checkUserName = async (data) => {
  console.log(data);
  const checkName = await AppDataSource.createQueryBuilder()
    .select(['user.userName'])
    .from(User, 'user')
    .where('user.userName = :userName', { userName: data.userName })
    .getOne();
  let result = false;
  if (checkName) {
    result = true;
  }
  return result;
};

export const checkEmail = async (data) => {
  console.log(data);
  const checkEmail = await AppDataSource.createQueryBuilder()
    .select(['user.email'])
    .from(User, 'user')
    .where('user.email = :email', { email: data.email })
    .getOne();
  let result = false;
  if (checkEmail) {
    result = true;
  }
  return result;
};

export const addUser = async (data) => {
  console.log(data);
  const result = await AppDataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values(data)
    .execute();
  if (result.identifiers) {
    const token = await CreateToken(data);
    const tokenResult = {
      id: result.identifiers[0].id,
      token: token,
    };
    return tokenResult;
  } else {
    return result;
  }
};

export const getUser = async (data) => {
  console.log(data);
  const result = await AppDataSource.getRepository(User)
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.userName = :userName', { userName: data.userName })
    .getOne();
  return result;
};

export const updateUser = async (data) => {
  console.log(data);
  const uid = data.id;
  delete data.id;
  const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set(data)
    .where('id = :id', { id: uid })
    .execute();
  return result;
};
