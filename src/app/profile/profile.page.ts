import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import {CameraSource} from '@capacitor/camera/dist/esm/definitions';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedTab: string = 'ads';
  // imageUri: string | undefined;
  imageSource: any;
  

  isEditProfileModalOpen: boolean = false;
  editProfileData: any = {
    name: 'Shadow prime',
    username: 'shadowprime',
    email: 'abcdefgh1200@gmail.com',
    phone: '1234567890'
  };



  constructor(private domSanitizer: DomSanitizer, private modalCtrl: ModalController) { 
    this.imageSource = 'assets/bg/background.jpg';
  }

  ngOnInit() {
  }


  openEditProfileModal() {
    this.isEditProfileModalOpen = true;
  }

  closeEditProfileModal() {
    this.isEditProfileModalOpen = false;
  }



  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      saveToGallery: true
    });
    // this.imageSource = image.dataUrl;

    this.imageSource = this.domSanitizer.bypassSecurityTrustUrl(image.webPath ? image.webPath : "");
  }

  getPhoto(){
    return this.imageSource;
  }


  saveProfile() {
    // Logic to save the updated profile data
    console.log('Updated Profile Data:', this.editProfileData);
    this.closeEditProfileModal();
  }

}

  // async takePicture() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: false,
  //       resultType: CameraResultType.DataUrl
  //       source: CameraSource
  //     });

  //     this.imageUri = image.webPath; // Store the image URI to display
  //     console.log('Image URI:', this.imageUri);
  //   } catch (error) {
  //     console.error('Error taking picture:', error);
  //   }
  // }

