package sample;

import javafx.event.ActionEvent;
import javafx.scene.control.*;
import javafx.stage.Stage;
import java.awt.Desktop;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Controller {
    public TextArea textText;
    public TextField textRegex;
    public Button btnCheck;
    public Label lblResult;
    public RadioMenuItem ignoreCase;
    public RadioMenuItem ignoreSpecial;

    public void initialize() {
        lblResult.setText("");
    }

    public void checkRegex(ActionEvent actionEvent) {
        Pattern p;
        if (ignoreCase.isSelected() && ignoreSpecial.isSelected())
            p = Pattern.compile(textRegex.getText(), Pattern.CASE_INSENSITIVE | Pattern.LITERAL);
        else
            if (ignoreCase.isSelected())
                p = Pattern.compile(textRegex.getText(), Pattern.CASE_INSENSITIVE);
            else
                if (ignoreSpecial.isSelected())
                    p = Pattern.compile(textRegex.getText(), Pattern.LITERAL);
                else
                    p = Pattern.compile(textRegex.getText());

        Matcher m = p.matcher(textText.getText());
        if (m.find())
            lblResult.setText("OK");
        else
            lblResult.setText("NG");
    }

    public void close(ActionEvent actionEvent) {
        Stage stage = (Stage) textRegex.getScene().getWindow();
        stage.close();
    }

    public void openCheatScheet(ActionEvent actionEvent) {
        if (Desktop.isDesktopSupported()) {
            try {
                URL url = getClass().getResource("/sample/regex_cheatsheet.pdf");
                File myFile = new File(url.toURI());
                Desktop.getDesktop().open(myFile);
            } catch (IOException | URISyntaxException ex) {}
        }
    }
}
