import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { ChatbotProvider } from '../../providers/chatbot/chatbot';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/profile.png',
    username: 'Get Healed Bot',
  };

  user = {
    _id: '534b8fb2aa5e7afc1b23e69c',
    pic: 'assets/person.png',
    username: 'Hackathon',
  };

  doneLoading = false;

  messages = [
    // {
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'OH CRAP!!'
    // },
    // {
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'what??'
    // },
    // {
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'Pretty long message with lots of content'
    // },
    // {
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'Pretty long message with even way more of lots and lots of content'
    // },
    // {
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'what??'
    // },
    // {
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'yes!'
    // }
  ];

  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private chat: ChatbotProvider) {

    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });
    this.chatBox = '';

    this.chat.initConversation().then((data: any) => {
      data.response.map(response => {
        this.messages.push({
          date: data.date,
          userId: this.toUser._id,
          username: this.toUser.username,
          pic: this.toUser.pic,
          text: response
        });
      })
      
    });


  }

  send(message) {
    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);
      const messageData = {
        toId: this.toUser._id,
        date: new Date(),
        userId: this.user._id,
        username: this.toUser.username,
        pic: this.toUser.pic,
        text: message
      };
      this.chat.responseToBot(message).then((data: any) => {
        this.messages.push(messageData);
        this.scrollToBottom();

        setTimeout(() => {
          const replyData = {
            date: data.date,
            userId: this.toUser._id,
            username: this.toUser.username,
            pic: this.toUser.pic,
            text: data.response[0]
          }
          this.messages.push(replyData);
          this.scrollToBottom();
        }, 500);
      });
    }
    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

}