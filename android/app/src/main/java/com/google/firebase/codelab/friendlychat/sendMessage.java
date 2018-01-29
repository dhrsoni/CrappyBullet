package com.google.firebase.codelab.friendlychat;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.ProgressBar;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Dhruv on 1/2/2018.
 */

public class sendMessage extends AsyncTask<Void, Void, Void> {
    private  outboundMessage msg;
    private static final String TAG = "SendBaseID";
    private SignInActivity lastActivity;
    private boolean isSuccess = true;

    public sendMessage(outboundMessage msg){
        this.msg = msg;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        StringBuilder sb = new StringBuilder();
        JSONObject js = new JSONObject();
        String json = "";
        String http = "http://172.20.20.20:8080/msgReceived";
        HttpURLConnection urlConnection=null;
        try {
            js.put("sent_from","IDa");
            js.put("uid",msg.getUid());
            js.put("email",msg.getEmail());
            js.put("contact_number",msg.getNumber());
            js.put("text",msg.getText());
            js.put("sent_date",msg.getTime());
            js.put("is_incoming",msg.isIncoming());
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
            Log.e(TAG,"IOException");
            isSuccess = false;

        }
        return null;
    }
}
