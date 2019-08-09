export class RegisterInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassWord: string;
  role: string[];

  constructor(firstName: string, lastName: string, username: string, email: string, password: string, confirmPassWord: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassWord = confirmPassWord;
    this.role = ['user'];
  }
}
