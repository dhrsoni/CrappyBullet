package com.google.firebase.codelab.friendlychat;

/**
 * Created by Dhruv on 12/31/2017.
 */

public class userDetail {
    private String email;
    private String uid;
    private String name;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {

        return email;
    }

    public String getUid() {
        return uid;
    }

    public String getName() {
        return name;
    }

    public userDetail(String email, String uid, String name) {

        this.email = email;
        this.uid = uid;
        this.name = name;
    }
}
