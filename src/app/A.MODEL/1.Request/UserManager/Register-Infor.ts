export class RegisterInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: string[];

  constructor(firstName: string, lastName: string, username: string, email: string, password: string, avatarUrl: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.role = ['user'];
  }
}

