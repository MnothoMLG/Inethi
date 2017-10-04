import { Component,ViewChild ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from "../../providers/data/data";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  regstering_failed: boolean = false;
  loggin_failed: boolean = false;
  logged_in: boolean;
  user_details: any;
  sign_in: any;


  username : string;
  password : string;
  pass_confirm: string; //password confirmation in case of sign up
  email: string;


  constructor(public data : DataProvider , public navCtrl: NavController, public navParams: NavParams) {

    this.username, this.password = ""; //we don't know these 2 as for now


    this.user_details =[
      {username : "Mnotho", password:"password123"},
      {username : "Melissa", password:"thePass"}
    ];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Register_Page()
  {
    this.navCtrl.push(RegisterPage); //push the  register page ( Also comes with an option for going back)
  }

  log_in_user()
  {
    this.user_details = this.data.get_response("getUsers").subscribe( data =>
            { 
              console.log("The actual response data :" + data[0]); 
              this.user_details = data;
              this.authenticate();
              //this.seeData(this.data_from_server);
            }
      );
    console.log("Username :" + this.username +"Password :"+ this.password);

     //AUTHENTICATE
  }

  authenticate()
  {
    for (var user in this.user_details)
      {
        
        if(this.user_details[user].username == this.username || this.user_details[user].email == this.username )
          {
            if (this.user_details[user].password == this.password)
              {
                this.logged_in = true;
              }
          }
      }
  
      if(this.logged_in)
      {
          this.loggin_failed = false;
          this.navCtrl.push(TabsPage); //push the  register page ( Also comes with an option for going back)
      }
      else{
        this.loggin_failed = true;
      }

  }

  register_user()
  {

    //send post request 

    //user info
    
    let credentials = {
      username : this.username,
      password : this.password,
      pass_confirm: this.pass_confirm, //password confirmation in case of sign up
      email: this.email
    
    }
    if(this.pass_confirm == this.password)
    {
        this.data.send_register_request(credentials);
    }
    else{
      this.regstering_failed = true;
    }
   

  }

}
