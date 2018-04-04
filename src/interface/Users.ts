import { Films } from "../interface/Films";

export interface Users {
  guid: String; 
  pseudo: String; 
  id: String; 
  userName: String;
  normalizedUserName: String;
  email: String; 
  normalizedEmail: String;
  emailConfirmed: String; 
  passwordHash: String; 
  securityStamp: String; 
  concurrencyStamp: String; 
  phoneNumber: String; 
  phoneNumberConfirmed: Boolean; 
  twoFactorEnabled: Boolean;
  lockoutEnd: String;
  lockoutEnabled: Boolean;
  accessFailedCount: Int16Array; 
  jeLeSuis : Boolean;
  teSuis : Boolean;
  film : Array<Films>;
  filmSearch : Array<Films>;
}