import * as React from "react";
declare var webkitSpeechRecognition: any;

import Message from "./Message";
import Bubble from "./Bubble";

interface MessengerState {
    inputText: string;
    isRecording: boolean;
    messagesArray: Array<any>;
}

let speechKey = "4ea4b0b8bc5447b8bc31e8241ea70b2e";

let recognition = new webkitSpeechRecognition();

export default class Messenger extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        };
    }

    setText(text) {
        this.setState({
            inputText: text,
            isRecording: false
        });
    }

    sendMessage(text: string) {
        console.log("send message");
    }

    stopRecording() {
         recognition.stop();
        this.state.isRecording = false;
    }

    startTranslate() {
        if (this.state.isRecording) {
           this.stopRecording();
        }
        else {
            this.state.isRecording = true;

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";
            recognition.onstart = function() {
                console.log('recording');
            };

            recognition.onend = function() {
                console.log('stopped');
            };

            recognition.onresult = (event) => {

                let finalText = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    //console.log(event.results[i][0].transcript);
                    if (event.results[i].isFinal) {
                        finalText += event.results[i][0].transcript;
                    } 

                }
                //console.log(finalText);
                if (finalText !== '') {
                    this.setState({
                        inputText: finalText,
                        isRecording: this.state.isRecording
                    });
                    this.stopRecording();
                }
            }
            recognition.start();
        };
    }

    renderTextInput() {

        return (
            <div className="textInput__cont">
                <button className="textInput__audio" style={{ background: "url(img/mic.svg)" }} onClick={this.startTranslate.bind(this) } />
                <input id="output" className="textInput__input" type="text" placeholder="Type a message..." value={this.state.inputText} />
                <button className="textInput__btn" onClick={this.sendMessage.bind(this) }>Send</button>
            </div>
        );
    }

    renderMessages() {
        return (
            <div className="messages__cont">
                <div className="messages__timeStamp">Yesterday at 7: 00 PM</div>

                <Bubble bubbleLeft={false} message="This is a message" />

                <div className="messages__timeStamp">Today at 5: 00 PM</div>

                <Bubble bubbleLeft={true} message="this is a another message" avatar="AF" />

            </div>
        );
    }

    render() {
        return (
            <div className="message__wrapper">
                {this.renderMessages() }
                {this.renderTextInput() }
            </div>
        );
    }
}