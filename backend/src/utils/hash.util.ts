import * as argon2 from 'argon2';

export class HashUtil {
  static async hash(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  static async verify(hashedData: string, plainData: string): Promise<boolean> {
    try {
      return await argon2.verify(hashedData, plainData);
    } catch {
      return false;
    }
  }
}