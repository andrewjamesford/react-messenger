import * as React from "react";

interface BubbleProps {
    bubbleLeft: boolean;
    message: string;
    avatar?: string;
}

export default class Bubble extends React.Component<BubbleProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {bubbleLeft, message, avatar} = this.props;
        let bubbleClass = "bubble bubble--right";
        if (bubbleLeft) {
            bubbleClass = "bubble bubble--left";
        }
        let avatarObj = null;
        if (avatar !== "" && avatar != null) {
            avatarObj = <div className="avatar">{avatar}</div>;
        }
        return (
            <div className="bubble__wrap">
                {avatarObj}
                <div className={bubbleClass}>{message}</div>
            </div>
        );


    }
}