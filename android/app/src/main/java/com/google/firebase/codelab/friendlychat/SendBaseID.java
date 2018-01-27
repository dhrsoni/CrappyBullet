package com.google.firebase.codelab.friendlychat;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;

import com.google.firebase.auth.FirebaseAuth;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Dhruv on 11/6/2016.
 */

public class SendBaseID extends AsyncTask<Void, Void, Void> {
    private static final String TAG = "SendBaseID";
    private SignInActivity lastActivity;
    private boolean isSuccess = true;
    private  ProgressBar spinner;
    private userDetail detail;


    public SendBaseID(SignInActivity lastActivity, ProgressBar spinner,userDetail detail){
        this.lastActivity = lastActivity;
        this.spinner = spinner;
        this.detail = detail;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        StringBuilder sb = new StringBuilder();
        JSONObject js = new JSONObject();
        String json = "";
        String http = "http://192.168.173.1:8080/newUser";
        Log.d(TAG,"SendbaseID http "+http);
        HttpURLConnection urlConnection=null;
        try {
            js.put("ID","IDa");
            js.put("fcmID",detail.getUid());
            js.put("display_name",detail.getName());
            js.put("email",detail.getEmail());
            json = js.toString();

            URL url = new URL(http);
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setUseCaches(false);
            urlConnection.setConnectTimeout(10000);
            urlConnection.setReadTimeout(10000);
            urlConnection.setRequestProperty("Content-Type","application/json");
            urlConnection.setRequestProperty("Host", "android.schoolportal.gr");
            urlConnection.connect();
            OutputStreamWriter out = new   OutputStreamWriter(urlConnection.getOutputStream());
            out.write(json);
            out.close();


            int HttpResult =urlConnection.getResponseCode();
            if(HttpResult ==HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(
                        urlConnection.getInputStream(),"utf-8"));
                String line = null;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();

                Log.d(TAG,sb.toString());

            }else{
                Log.d(TAG,urlConnection.getResponseMessage());
            }

        }catch (JSONException e){
            Log.e(TAG,"Creating jason faild");
            isSuccess = false;
        }catch (MalformedURLException u){
            Log.e(TAG,"MalformedURLException");
            isSuccess = false;
        }catch (IOException e){
            Log.d(TAG,e.toString());
            Log.e(TAG,"IOException");
            isSuccess = false;

        }
        return null;
    }


    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);

        if(isSuccess) {
            lastActivity.startActivity(new Intent(lastActivity, MainActivity.class));
        }else{
            spinner.setVisibility(View.GONE);
            FirebaseAuth mFirebaseAuth = FirebaseAuth.getInstance();
            //mFirebaseUser = mFirebaseAuth.getCurrentUser();
            mFirebaseAuth.signOut();

        }

    }

}
