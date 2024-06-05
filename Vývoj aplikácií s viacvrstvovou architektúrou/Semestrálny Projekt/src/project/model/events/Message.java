package project.model.events;

import java.io.Serializable;

public class Message implements Serializable {
    private String text;
    private String userName;

    public Message(String text, String userName) {
        this.text = text;
        this.userName = userName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Object clone(){
        return new Message(this.text, this.userName);
    }
}
