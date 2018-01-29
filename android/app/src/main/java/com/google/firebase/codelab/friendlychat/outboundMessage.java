package com.google.firebase.codelab.friendlychat;

/**
 * Created by Dhruv on 1/2/2018.
 */

public class outboundMessage {
    private String number;
    private String time;
    private String uid;
    private boolean isIncoming;
    private String Text;
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }



    public String getEmail() {
        return email;
    }


    public void setText(String test) {
        this.Text = test;
    }

    public String getText() {

        return Text;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setIncoming(boolean incoming) {
        isIncoming = incoming;
    }

    public String getNumber() {

        return number;
    }

    public String getTime() {
        return time;
    }

    public String getUid() {
        return uid;
    }

    public boolean isIncoming() {
        return isIncoming;
    }
}
