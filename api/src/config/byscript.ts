import {compareSync,hashSync} from  'bcryptjs';

export class BcryptAdapter {
    static hash (password:string){
      return hashSync(password);
    }

    static compare (password:string,hashed:string){
      return compareSync(password,hashed);
    }
}