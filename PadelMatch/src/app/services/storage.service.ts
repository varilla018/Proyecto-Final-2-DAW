import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
@Injectable({
  providedIn: 'root'
})


export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
    
  }

  public saveElement(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async getElement(key:string){
    const elemento = await this._storage?.get(key);
    return elemento;
  }

  public async deleteElement(key:string){
    this._storage?.remove(key);
  }
  
}
