import { LocalStorage } from 'quasar';

type ChangeListener = (
  newToken: string | null,
  oldToken: string | null
) => void;

// this handles token storing to localstorage and notifying about changes
// also triggereing listeners when storage key is changed from another browser tab
class AuthManager {
  private currentToken: string | null = this.getToken();
  private onChangeListeners: ChangeListener[] = [];

  private storageListener = (evt: StorageEvent) => {
    if (evt.key !== this.storageKey) {
      return;
    }

    this.notifyListeners();
  };

  constructor(private storageKey: string) {
    window.addEventListener('storage', this.storageListener);
  }

  private notifyListeners(): void {
    const newToken = this.getToken();

    if (this.currentToken === newToken) {
      return;
    }

    this.onChangeListeners.forEach((fn) => fn(newToken, this.currentToken));
    this.currentToken = newToken;
  }

  // ads listener for changes, returns unsubscribe function
  public onChange(listener: ChangeListener): () => void {
    this.onChangeListeners.push(listener);

    // call new listener with current token if we have one
    if (this.currentToken !== null) {
      window.setTimeout(() => listener(this.currentToken, null), 0);
    }

    return () => {
      const idx = this.onChangeListeners.indexOf(listener);

      if (idx >= 0) {
        this.onChangeListeners.splice(idx, 1);
      }
    };
  }

  // this is just shortcut for adding change listener which calls callback only when token was removed
  public onLogout(listener: () => void): () => void {
    return this.onChange((token) => {
      if (token === null) {
        listener();
      }
    });
  }

  public getToken(): string | null {
    return LocalStorage.getItem(this.storageKey);
  }

  public removeToken(): void {
    LocalStorage.remove(this.storageKey);
    this.notifyListeners();
  }

  // this is just an alias for removing the token from storage
  public logout(): void {
    return this.removeToken();
  }

  public setToken(token: string): void {
    LocalStorage.set(this.storageKey, token);
    this.notifyListeners();
  }
}

export default new AuthManager('auth_token');
