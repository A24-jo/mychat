"use client"
import EmojiPicker, {
    EmojiStyle,
} from "emoji-picker-react";

export default function Emojis({setInput}) {

    function onClick(emojiData) {
          setInput((prevInputValue) => ({
            ...prevInputValue,
            text: prevInputValue.text + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
          }));
    }
    return (
        <div >
            <EmojiPicker
                onEmojiClick={onClick}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.NATIVE}
            />
        </div>
    );
}
