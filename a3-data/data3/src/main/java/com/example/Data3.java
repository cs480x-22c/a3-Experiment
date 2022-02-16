package com.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.Random;
import java.io.FileWriter;
import java.io.IOException;
import javax.sound.sampled.SourceDataLine;
import java.io.*;

public class Data3{
    public static void main(String[] args) throws IOException{

        Random rand = new Random();
        //String graphtype = args[0];
        //String graphtype = "n";
        String graphtype;
        DataObj[] Bars = new DataObj[80];

        /*int[] data = new int[6]; // Testing
        int[] comp = new int[2];
        for(int i = 0; i < 6; i++){
            data[i] = rand.nextInt(100) + 1;
        }
        comp[0] = rand.nextInt(6);
        comp[1] = -1;

        DataObj a = new DataObj();
        a.data = data;
        a.comp1 = comp[0];
        a.comp2 = comp[1];
        for(int i = 0; i < 5; i++){
            System.out.println(a.data[i]);
        }
        System.out.println(a.comp1 + "  " + a.comp2);*/

        for(int k = 0; k < 4; k++){
           if(k % 2 == 0){
                graphtype = "d";
           } 
           else {
               graphtype = "n";
           }
        

            for(int z = 0; z < 20; z++){
                int[] data = new int[6];
                int[] comp = new int[2];

                for(int i = 0; i < 6; i++){
                    data[i] = rand.nextInt(100) + 1;
                }


                comp[0] = rand.nextInt(6);
                comp[1] = -1;
                
                if(graphtype.equals("d")){
                    for(int x = rand.nextInt(12); x >= 0; x--){
                        comp[1]++;
                        if(comp[1] > 5){
                            comp[1] = 0;
                        }
                        while(comp[1] == comp[0]-1 || comp[1] == comp[0] || comp[1] == comp[0]+1){
                            comp[1]++;
                        }
                        if(comp[1] > 5){ //Wrap around when index goes past 5
                            comp[1] = 0;
                        }
                    }
                }
                else if(graphtype.equals("n")){
                    int x = rand.nextInt(2);
                    if(comp[0] == 0){
                        comp[1] = 1;
                    }
                    else if(comp[0] == 5){
                        comp[1] = 4;
                    }
                    else if(x == 0){
                        comp[1] = comp[0] - 1;
                    }
                    else if(x == 1){
                        comp[1] = comp[0] + 1;
                    }
                
                }


                

                DataObj a = new DataObj(); //Make a new object that holds our data and comparison bar indexes
                a.data = data;
                a.comp1 = comp[0];
                a.comp2 = comp[1];
                a.graphtype = graphtype;

                Bars[k*20 + z] = a; //Add data and comparison bars to an array

            }
    }
        Gson gson = new GsonBuilder().setPrettyPrinting().create(); //Export data to file in readable format
        FileWriter jsonWriter = new FileWriter("ouput.json");
        String jsonstring = gson.toJson(Bars);
        jsonWriter.write(jsonstring);
        jsonWriter.close();
        //System.out.println(jsonstring);
        
    }
}
