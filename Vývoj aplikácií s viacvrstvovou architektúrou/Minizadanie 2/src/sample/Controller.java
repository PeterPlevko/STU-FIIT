package sample;

import javafx.fxml.Initializable;
import javafx.scene.control.Label;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;

public class Controller implements Initializable {
    public Label testOS;
    public Label name;
    public Label java;
    public Label userDIrName;
    public Label userDirSize;
    public Label memoryForJVM;
    public Label availMemoryJVM;
    public Label beforeAllocation;


    // https://www.tutorialspoint.com/javaexamples/dir_size.htm
    public long findSize(String path) {
        long totalSize = 0;
        ArrayList<String> directory = new ArrayList<String>();
        File file = new File(path);

        if(file.isDirectory()) {
            directory.add(file.getAbsolutePath());
            while (directory.size() > 0) {
                String folderPath = directory.get(0);
                directory.remove(0);
                File folder = new File(folderPath);
                File[] filesInFolder = folder.listFiles();
                int noOfFiles = filesInFolder.length;

                for(int i = 0 ; i < noOfFiles ; i++) {
                    File f = filesInFolder[i];
                    if(f.isDirectory()) {
                        directory.add(f.getAbsolutePath());
                    } else {
                        totalSize += f.length();
                    }
                }
            }
        } else {
            totalSize = file.length();
        }
        return totalSize;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        testOS.setText("Meno: " + System.getProperty("os.name") + ", Verzia: " + System.getProperty("os.version") + ", Architektura: " + System.getProperty("os.arch"));
        name.setText(System.getProperty("user.name"));
        java.setText(System.getProperty("java.version"));
        userDIrName.setText(System.getProperty("user.dir"));
        userDirSize.setText(String.valueOf(findSize(System.getProperty("user.dir"))/(1024)) + "KB");
        memoryForJVM.setText(String.valueOf(Runtime.getRuntime().maxMemory()/(1024*1024)) + "MB");
        availMemoryJVM.setText(String.valueOf(Runtime.getRuntime().totalMemory()/(1024*1024)) + "MB");
        beforeAllocation.setText(String.valueOf(Runtime.getRuntime().freeMemory()/(1024*1024)) + "MB");
    }
}
