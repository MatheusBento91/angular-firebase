export class LocalStorageUtils {

  public getUser() {
      return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public saveUserData(response: any) {
      this.saveUserToken(response.accessToken);
      this.saveUser(response.userToken);
  }

  public clearUserData() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  }

  public getUserToken(): string | null {
      return localStorage.getItem('token');
  }

  public saveUserToken(token: string) {
      localStorage.setItem('token', token);
  }

  public saveUser(user: string) {
      localStorage.setItem('user', JSON.stringify(user));
  }

}
