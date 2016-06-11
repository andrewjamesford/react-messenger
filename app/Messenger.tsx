import * as React from "react";
import * as Microsoft from "oxford-speech";

import Message from "./Message";
import Bubble from "./Bubble";

interface MessengerState {
    inputText: string;
}

export default class Messenger extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        };
    }

    setText(text) {
        this.setState({
            inputText: text
        });
    }

    startTranslate() {
        console.log('start translate');
        let client;
        client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
                    Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.longDictation,
                    "en-us",
                    "4ea4b0b8bc5447b8bc31e8241ea70b2e",
                    "4ea4b0b8bc5447b8bc31e8241ea70b2e");

        client.startMicAndRecognition();
            setTimeout(function () {
                client.endMicAndRecognition();
            }, 5000);

        client.onPartialResponseReceived = function (response) {
            this.setText(response);
        };

        client.onFinalResponseReceived = function (response) {
            this.setText(JSON.stringify(response));
        };

        client.onIntentReceived = function (response) {
            this.setText(response);
        };
    }

    sendMessage(text: string) {
        console.log("send message");
    }

    renderTextInput() {

        return (
            <div className="textInput__cont">
                <button className="textInput__audio" style={{background: "url(img/mic.svg)"}} onClick={this.startTranslate.bind(this)} />
                <input id="output" className="textInput__input" type="text" placeholder="Type a message..." value={this.state.inputText} />
                <button className="textInput__btn" onClick={this.sendMessage.bind(this)}>Send</button>
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